import { Component, OnDestroy } from '@angular/core';
import { RestService } from './services/rest.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AppStateService } from './appstate/app-state.service';
import { Subscription } from 'rxjs';
import { AppState } from './models/AppState';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  
  
  private appStateSubscription: Subscription;
  private appState: AppState = new AppState();

  constructor(private appStateService: AppStateService) {
    this.subscribeToAppState();
  }

  private subscribeToAppState() : void {
    this.appStateSubscription = this.appStateService.getAppStateSubjectAsObservable().subscribe((appState: AppState) => {
      console.log('(App Component) App State subcription received:');
      console.log(appState);
      this.appState = appState;
    });
  }

  
  /**
   * Unsubscribe the app state subcription on destroy.
   */
  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe();
  }

}
