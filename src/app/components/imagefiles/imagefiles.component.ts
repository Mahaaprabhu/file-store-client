import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/appstate/app-state.service';
import { AppState } from 'src/app/models/AppState';
import { MediaMetaData } from 'src/app/models/MediaMetaData';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-imagefiles',
  templateUrl: './imagefiles.component.html',
  styleUrls: ['./imagefiles.component.scss']
})
export class ImagefilesComponent implements OnInit, OnDestroy {
  
  
  private appStateSubscription: Subscription;
  private appState: AppState = new AppState();

  imageFiles: [String, MediaMetaData][] = [];

  constructor(private appStateService: AppStateService, private restService: RestService) {
    this.subscribeToAppState();
  }

  ngOnInit(): void { }

  private subscribeToAppState() : void {
    this.appStateSubscription = this.appStateService.getAppStateSubjectAsObservable().subscribe((appState: AppState) => {
      this.appState = appState;
      this.imageFiles = [...(appState.imageFilesMetaData.entries())].sort().reverse();
      console.log('(Image files Component) App State subcription received & sorted:');
      console.log(this.imageFiles);
    });
  }

  private getMediaFileUri(medieFileId: String): String {
    return this.restService.getMediaFileUri(medieFileId);
  }

  /**
   * Unsubscribe the app state subcription on destroy.
   */
  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe();
  }

}