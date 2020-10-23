import { Component, OnInit } from '@angular/core';
import { ServiceConfiguration } from 'projects/boe-lib/src/public-api';



@Component({
  selector: 'app-botdetaileditor',
  template: `<BO-DetailEditor [serviceConfiguration]="serviceConfiguration" [selectedId]="selectedId" ></BO-DetailEditor>`,
})
export class BotDetailEditorEquipmentComponent implements OnInit {
  public selectedId: string = '7e4aa133-47c5-4729-9118-dec6ea8ad328';
  public serviceConfiguration: ServiceConfiguration = new ServiceConfiguration('ProductionEquipmentManagement', 'ProductionEquipmentMgmtService', 'Equipment');

  constructor() { }

  ngOnInit() {
  }
}
