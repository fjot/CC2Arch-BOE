import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatahandlingService } from 'projects/boe-lib/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-filter-view',
  templateUrl: './filter-view.component.html',
  styleUrls: ['./filter-view.component.scss']
})
export class FilterViewComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  searchVisible = false;
  searchTerm: string;
  hasSelectedItem: boolean = false;
  sortTypeString: string = 'sort_asc';

  constructor(private datahandlingService: DatahandlingService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.datahandlingService.sortOrderAsc$
        .subscribe(sortAsc => this.sortTypeString = sortAsc ? 'sort-asc' : 'sort-desc')); // 'sort_ascending' : 'sort_descending'

    this.subscriptions.add(
      this.datahandlingService.hasSelectedItem$
        .subscribe(hasSelectedItem => this.hasSelectedItem = hasSelectedItem));
  }

  addNewEntity() {
    this.datahandlingService.showAddEntity();
  }

  deleteEntity() {
    this.datahandlingService.showDeleteEntity();
  }

  invertSort() {
    this.datahandlingService.invertSort();
  }

  invertSearch(): void {
    this.searchVisible = !this.searchVisible;
  }

  search(): void {
    this.datahandlingService.search(this.searchTerm);
  }

  cancelSearch(): void {
    this.searchTerm = '';
    this.searchVisible = false;
    this.search();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
