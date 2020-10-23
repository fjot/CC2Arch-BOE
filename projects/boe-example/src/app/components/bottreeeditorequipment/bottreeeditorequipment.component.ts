import { Component, OnInit } from '@angular/core';
import { IFilter, IFilterBarItem } from '@proleit/sdk-components-filterbar';
import { ServiceConfiguration } from 'projects/boe-lib/src/public-api';

@Component({
  selector: 'app-bottreeeditor',
  template: `<p-filter-bar [selectableFilters]="filterItems" (ngModelChanged)="filterbarChanged($event)" *ngIf=filterVisible ></p-filter-bar>
             <BO-TreeEditor [serviceConfiguration]="serviceConfiguration" [filterbarValues]="filterValue" ></BO-TreeEditor>`,
})
export class BotTreeEditorEquipmentComponent implements OnInit {
  public filterVisible = false;
  public filterItems: IFilterBarItem[];
  public filterValue: IFilter[];
  public serviceConfiguration: ServiceConfiguration = new ServiceConfiguration('ProductionEquipmentManagement', 'ProductionEquipmentMgmtService', 'Equipment');

  constructor() { }

  ngOnInit() {
  }

  public filterbarChanged(filters: IFilter[]) {
    this.filterValue = filters;
  }

}
