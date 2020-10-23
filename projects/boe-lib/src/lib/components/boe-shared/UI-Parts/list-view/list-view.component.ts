import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatahandlingService, EntityItemLite } from 'projects/boe-lib/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  isLoading: boolean;
  listData: EntityItemLite[];
  selectedKeys: string[];

  constructor(private datahandlingService: DatahandlingService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.datahandlingService.isLoading$
        .subscribe(data => this.isLoading = data));

    this.subscriptions.add(
      this.datahandlingService.listData$
        .subscribe(data => this.listData = data));

    this.subscriptions.add(
      this.datahandlingService.setSelectedNodes$
        .subscribe(selectedNodes => this.selectedKeys = selectedNodes));
  }

  handleSelection = (dataItem: any) => {
    if (dataItem && dataItem.dataItem) {
      this.datahandlingService.selectedNodeChanged(dataItem.dataItem);
      return;
    }

    this.datahandlingService.selectedNodeChanged(dataItem);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
