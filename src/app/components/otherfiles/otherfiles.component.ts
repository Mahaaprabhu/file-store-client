import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/appstate/app-state.service';
import { AppState } from 'src/app/models/AppState';
import { MediaMetaData } from 'src/app/models/MediaMetaData';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-otherfiles',
  templateUrl: './otherfiles.component.html',
  styleUrls: ['./otherfiles.component.scss']
})
export class OtherfilesComponent implements OnInit, OnDestroy {
  
  
  private appStateSubscription: Subscription;
  private appState: AppState = new AppState();

  otherFiles: [String, MediaMetaData][] = [];
  displayComponent: boolean = false;

  constructor(private appStateService: AppStateService, private restService: RestService) {
    this.subscribeToAppState();
  }

  ngOnInit(): void { }
  
  private subscribeToAppState() : void {
    this.appStateSubscription = this.appStateService.getAppStateSubjectAsObservable().subscribe((appState: AppState) => {
      this.appState = appState;
      this.otherFiles = [...(appState.otherFilesMetaData.entries())].sort().reverse();
      console.log('(Other files Component) App State subcription received & sorted:');
      console.log(this.otherFiles);
      this.displayComponent = this.appState.activeMediaSelectionType === 'Others';
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