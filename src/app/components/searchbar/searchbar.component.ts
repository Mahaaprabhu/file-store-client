import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/appstate/app-state.service';
import { AppState } from 'src/app/models/AppState';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  filterKey = "";
  activeCategorySelection: String = 'Images';

  private appStateSubscription: Subscription;
  private appState: AppState = new AppState();

  constructor(private appStateService: AppStateService) {
    this.subscribeToAppState();
  }

  ngOnInit(): void {
  }

  onFilter(event: any): void {
    console.log(event);
    console.log(this.filterKey);
    this.appStateService.filterMediaFiles(this.filterKey);
  }

  onCategorySelection(selectionCategory: String) {
    this.appStateService.updateAtiveMediaSelectionType(selectionCategory);
  }

  private subscribeToAppState() : void {
    this.appStateSubscription = this.appStateService.getAppStateSubjectAsObservable().subscribe((appState: AppState) => {
      this.appState = appState;
      this.activeCategorySelection = this.appState.activeMediaSelectionType;
    });
  }

  /**
   * Unsubscribe the app state subcription on destroy.
   */
  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe();
  }

}
