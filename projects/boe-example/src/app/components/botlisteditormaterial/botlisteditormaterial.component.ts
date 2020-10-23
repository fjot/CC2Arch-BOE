import { Component, OnInit } from '@angular/core';
import { IFilter, IFilterBarItem } from '@proleit/sdk-components-filterbar';
import { ServiceConfiguration } from 'projects/boe-lib/src/public-api';


@Component({
  selector: 'app-botlisteditor',
  template: `<p-filter-bar [selectableFilters]="filterItems" (ngModelChanged)="filterbarChanged($event)" *ngIf=filterVisible ></p-filter-bar>
             <BO-ListEditor [serviceConfiguration]="serviceConfiguration" [filterbarValues]="filterValue" ></BO-ListEditor>`,
})
export class BotListEditorMaterialComponent implements OnInit {
  public filterVisible = false;
  public filterItems: IFilterBarItem[];
  public filterValue: IFilter[];
  public serviceConfiguration: ServiceConfiguration = new ServiceConfiguration('MaterialManagement', 'MaterialManagementService', 'Material');

  constructor() { }

  ngOnInit() {
  }

  public filterbarChanged(filters: IFilter[]) {
    this.filterValue = filters;
  }

}
