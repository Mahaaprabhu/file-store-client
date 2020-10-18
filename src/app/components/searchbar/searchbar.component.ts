import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/appstate/app-state.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  filterKey = "";

  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
  }

  onFilter(event: any): void {
    console.log(event);
    console.log(this.filterKey);
    this.appStateService.filterMediaFiles(this.filterKey);
  }

}
