import { Component, OnInit, Input } from '@angular/core';

import { IFilter } from '@proleit/sdk-components-filterbar';
import { DisplayTypeEnum, ServiceConfiguration } from '../../models';

import { DatahandlingService } from '../../services/datahandling.service';

@Component({
  selector: 'boe-tree-detail',
  templateUrl: './boe-tree-detail.component.html',
  styleUrls: ['./boe-tree-detail.component.scss']
})
export class BOETreeDetailComponent implements OnInit {

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
    this.datahandlingService.displayType = DisplayTypeEnum.TreeWithDetailView;
  }

  ngOnInit() {
    this.datahandlingService.serviceConfiguration = this.serviceConfiguration;
    this.datahandlingService.LoadData();
  }
}
