import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/appstate/app-state.service';
import { AppState } from 'src/app/models/AppState';
import { MediaMetaData } from 'src/app/models/MediaMetaData';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-videofiles',
  templateUrl: './videofiles.component.html',
  styleUrls: ['./videofiles.component.scss']
})
export class VideofilesComponent implements OnInit, OnDestroy {
  
  
  private appStateSubscription: Subscription;
  private appState: AppState = new AppState();

  videoFiles: [String, MediaMetaData][] = [];
  displayComponent: boolean = false;

  constructor(private appStateService: AppStateService, private restService: RestService) {
    this.subscribeToAppState();
  }

  ngOnInit(): void { }
  
  private subscribeToAppState() : void {
    this.appStateSubscription = this.appStateService.getAppStateSubjectAsObservable().subscribe((appState: AppState) => {
      this.appState = appState;
      this.videoFiles = [...(appState.videoFilesMetaData.entries())].sort().reverse();
      console.log('(Video files Component) App State subcription received & sorted:');
      console.log(this.videoFiles);
      this.displayComponent = this.appState.activeMediaSelectionType === 'Videos';
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