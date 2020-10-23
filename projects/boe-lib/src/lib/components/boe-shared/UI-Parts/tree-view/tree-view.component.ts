import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { TreeViewComponent as KTreeViewComponent } from '@progress/kendo-angular-treeview';

import { EntityItemLite } from '../../../../models';

import { DatahandlingService } from '../../../../services/datahandling.service';

@Component({
  selector: 'lib-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @ViewChild('treeview', { static: true })
  treeview: KTreeViewComponent;

  isLoading: boolean;
  listData: EntityItemLite[];
  selectedKeys: string[];

  constructor(private datahandlingService: DatahandlingService) { }

  ngOnInit(): void {
    this.subscriptions.add(
                      this.datahandlingService.isLoading$
                          .subscribe(data => this.isLoading = data ));

    this.subscriptions.add(
                      this.datahandlingService.listData$.asObservable()
                          .subscribe(data => { this.listData = data; }));

    this.subscriptions.add(
                      this.datahandlingService.setSelectedNodes$.asObservable()
                          .subscribe(selectedNodes => this.selectedKeys = selectedNodes));

    this.subscriptions.add(
                      this.datahandlingService.subTreeNodesChanged$.asObservable()
                          .subscribe(node => this.treeview.rebindChildren()));
  }

  hasChildren = (node: EntityItemLite) =>
    node && node.hasChilds

  fetchChildren = (node: EntityItemLite) =>
    this.datahandlingService.loadTreeItems(node)

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
