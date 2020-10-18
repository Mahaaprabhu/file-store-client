import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/appstate/app-state.service';
import { AppState } from 'src/app/models/AppState';
import { MediaMetaData } from 'src/app/models/MediaMetaData';

@Component({
  selector: 'app-allfiles',
  templateUrl: './allfiles.component.html',
  styleUrls: ['./allfiles.component.scss']
})
export class AllfilesComponent implements OnInit, OnDestroy {
  
  
  private appStateSubscription: Subscription;
  private appState: AppState = new AppState();

  allFiles: [String, MediaMetaData][] = [];

  constructor(private appStateService: AppStateService) {
    this.subscribeToAppState();
  }

  ngOnInit(): void { }
  
  private subscribeToAppState() : void {
    this.appStateSubscription = this.appStateService.getAppStateSubjectAsObservable().subscribe((appState: AppState) => {
      this.appState = appState;
      this.allFiles = [...(appState.allFilesMetaData.entries())].sort().reverse();
      console.log('(All files Component) App State subcription received & sorted:');
      console.log(this.allFiles);
    });
  }

  
  /**
   * Unsubscribe the app state subcription on destroy.
   */
  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe();
  }

}
