import { Component, OnInit, Input } from '@angular/core';

import { IFilter } from '@proleit/sdk-components-filterbar';
import { ServiceConfiguration } from 'projects/boe-lib/src/public-api';
import { DisplayTypeEnum } from '../../models/display-type.enum';

import { DatahandlingService } from '../../services/datahandling.service';

@Component({
  selector: 'boe-list-detail',
  templateUrl: './boe-list-detail.component.html',
  styleUrls: ['./boe-list-detail.component.scss']
})
export class BOEListDetailComponent implements OnInit {

  @Input() serviceConfiguration: ServiceConfiguration;

  @Input()
  get filterbarValues() {
    return this.datahandlingService.filters;
  }
  set filterbarValues(filterbarValues: IFilter[]) {
      this.datahandlingService.filters = filterbarValues;

      if(this.datahandlingService.serviceConfiguration)
        this.datahandlingService.LoadData();
  }

  constructor(private datahandlingService: DatahandlingService) {
    this.datahandlingService.displayType = DisplayTypeEnum.ListWithDetailView;
  }

  ngOnInit() {
    this.datahandlingService.serviceConfiguration = this.serviceConfiguration;
    this.datahandlingService.LoadData();
  }
}
