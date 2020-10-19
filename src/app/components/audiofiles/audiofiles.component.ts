import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/appstate/app-state.service';
import { AppState } from 'src/app/models/AppState';
import { MediaMetaData } from 'src/app/models/MediaMetaData';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-audiofiles',
  templateUrl: './audiofiles.component.html',
  styleUrls: ['./audiofiles.component.scss']
})
export class AudiofilesComponent implements OnInit, OnDestroy {
  
  
  private appStateSubscription: Subscription;
  private appState: AppState = new AppState();

  audioFiles: [String, MediaMetaData][] = [];
  displayComponent: boolean = false;

  constructor(private appStateService: AppStateService, private restService: RestService) {
    this.subscribeToAppState();
  }

  ngOnInit(): void { }
  
  private subscribeToAppState() : void {
    this.appStateSubscription = this.appStateService.getAppStateSubjectAsObservable().subscribe((appState: AppState) => {
      this.appState = appState;
      this.audioFiles = [...(appState.audioFilesMetaData.entries())].sort().reverse();
      console.log('(Audio files Component) App State subcription received & sorted:');
      console.log(this.audioFiles);
      this.displayComponent = this.appState.activeMediaSelectionType === 'Audios';
    });
  }

  private getMediaFileUri(medieFileId: String): String {
    return this.restService.getMediaFileUri(medieFileId);
  }
  
  private onDeleteRequest(fileId: String) {
    this.appStateService.deleteMediaFileFromServer(fileId);
  }
  /**
   * Unsubscribe the app state subcription on destroy.
   */
  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe();
  }

}