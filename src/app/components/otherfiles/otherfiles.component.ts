import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/appstate/app-state.service';
import { AppState } from 'src/app/models/AppState';
import { MediaMetaData } from 'src/app/models/MediaMetaData';

@Component({
  selector: 'app-otherfiles',
  templateUrl: './otherfiles.component.html',
  styleUrls: ['./otherfiles.component.scss']
})
export class OtherfilesComponent implements OnInit, OnDestroy {
  
  
  private appStateSubscription: Subscription;
  private appState: AppState = new AppState();

  otherFiles: [String, MediaMetaData][] = [];

  constructor(private appStateService: AppStateService) {
    this.subscribeToAppState();
  }

  ngOnInit(): void { }
  
  private subscribeToAppState() : void {
    this.appStateSubscription = this.appStateService.getAppStateSubjectAsObservable().subscribe((appState: AppState) => {
      this.appState = appState;
      this.otherFiles = [...(appState.otherFilesMetaData.entries())].sort().reverse();
      console.log('(Other files Component) App State subcription received & sorted:');
      console.log(this.otherFiles);
    });
  }

  
  /**
   * Unsubscribe the app state subcription on destroy.
   */
  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe();
  }

}