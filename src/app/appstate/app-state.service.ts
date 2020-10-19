import { Injectable } from '@angular/core';
import { AppState } from '../models/AppState';
import { MediaMetaData } from '../models/MediaMetaData';
import { RestService } from '../services/rest.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private allFilesMetaData: Map<String, MediaMetaData> = new Map();
  private audioFilesMetaData: Map<String, MediaMetaData> = new Map();
  private imageFilesMetaData: Map<String, MediaMetaData> = new Map();
  private videoFilesMetaData: Map<String, MediaMetaData> = new Map();
  private otherFilesMetaData: Map<String, MediaMetaData> = new Map();
  private activeMediaSelectionType: String = 'Images';

  private appStateSubject: Subject<AppState> = new Subject<AppState>();
  mediaMetas: MediaMetaData[] = [];

  /**
   * Loads the App state and triggers the RxJs Subject.
   * @param restService 
   */
  constructor(private restService: RestService) { 
    this.loadAppState();
    this.notifySubcribers();
  }

  /**
   * Returns the App Satate Subject as an Observable and triggers the App state after a small delay.
   */
  public getAppStateSubjectAsObservable(): Observable<AppState> {
    const timeOutMilliSeconds = 1000;
    console.log('App State Subscription request received.');
    console.log(`App State Subject will be auto triggered in '${timeOutMilliSeconds}' milli seconds.`);
    setTimeout(()=>{
      console.log('App Satate Subject got notified!');
      this.notifySubcribers();
    }, timeOutMilliSeconds);
    return this.appStateSubject.asObservable();
  }

  public notifySubcribers(): void {
    this.appStateSubject.next(this.getShallowCopiedAppState());
  }

  public updateAtiveMediaSelectionType(categorySelection: String): void {
    this.activeMediaSelectionType = categorySelection || 'Images';
    this.notifySubcribers();
  }

  private getShallowCopiedAppState(): AppState {
    let appState: AppState = new AppState();
    appState.allFilesMetaData = new Map(this.allFilesMetaData);
    appState.audioFilesMetaData = new Map(this.audioFilesMetaData);
    appState.imageFilesMetaData = new Map(this.imageFilesMetaData);
    appState.videoFilesMetaData = new Map(this.videoFilesMetaData);
    appState.otherFilesMetaData = new Map(this.otherFilesMetaData);
    appState.activeMediaSelectionType = this.activeMediaSelectionType;
    return appState;
  }

  private loadAppState(): void {
    this.resetAppState();
    console.log('About to initiate APP State.');
    this.restService.getMediaMetaDataFromServer()
        .subscribe((mediaMetas: MediaMetaData[]) => {
          this.mediaMetas = [...mediaMetas];
          this.generateAppState(mediaMetas);
        });
  }

  public filterMediaFiles(filterKey: String): void {
    console.log(`%c Filter Key: ${filterKey}`, 'background: #222; color: #bada55');
    console.log(this.mediaMetas);
    if(!filterKey || (filterKey.trim().length == 0)) {
      console.log('no filter');
      this.generateAppState(this.mediaMetas);
      this.notifySubcribers();
      return;
    }
    this.resetAppState();
    const filteredMediaMetas: MediaMetaData[] = [...this.mediaMetas.filter((media)=>{
      return media.filename.trim().toLowerCase().includes(filterKey.trim().toLocaleLowerCase())
    })];
    this.generateAppState(filteredMediaMetas);
  }

  private generateAppState(mediaMetas: MediaMetaData[]): void {
    (mediaMetas || []).forEach(media => this.categorizeMediaData(media));
    this.notifySubcribers();
    console.log('App State got initiated.');
    console.log('ALL DATA:');
    console.log(this.allFilesMetaData);
    console.log('Image DATA:');
    console.log(this.imageFilesMetaData);
    console.log('Audio DATA:');
    console.log(this.audioFilesMetaData);
    console.log('Vido DATA:');
    console.log(this.videoFilesMetaData);
    console.log('Other DATA:');
    console.log(this.otherFilesMetaData);
    console.log('Selection Category:');
    console.log(this.activeMediaSelectionType);
  }

  public addMediaFile(formData: FormData) : void {
    this.restService.postMediaFileToServer(formData).subscribe(
      (res) => {
        console.log(res);
        this.loadAppState();
      },
      (err) => console.log(err)
    );
  }

  public deleteMediaFileFromServer(mediaFileId: String) : void {
    this.restService.deleteMediaFileFromServer(mediaFileId).subscribe(
      (res) => {
        console.log(res);
        this.loadAppState();
      },
      (err) => console.log(err)
    );
  }

  private resetAppState(): void {
    this.allFilesMetaData = new Map();
    this.audioFilesMetaData = new Map();
    this.videoFilesMetaData = new Map();
    this.imageFilesMetaData = new Map();
    this.otherFilesMetaData = new Map();
  }

  private categorizeMediaData(media: MediaMetaData): void {
      const mediaType: String = media.contentType || '';
      this.allFilesMetaData.set(media._id, media);
      if(mediaType.trim().toLocaleLowerCase().includes('audio')) {
        this.audioFilesMetaData.set(media._id, media);
        return;
      }
      if(mediaType.trim().toLocaleLowerCase().includes('video')) {
        this.videoFilesMetaData.set(media._id, media);
        return;
      }
      if(mediaType.trim().toLocaleLowerCase().includes('image')) {
        this.imageFilesMetaData.set(media._id, media);
        return;
      }
      this.otherFilesMetaData.set(media._id, media);
  }

}
