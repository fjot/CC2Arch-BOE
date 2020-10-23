import { Component, OnInit, Input } from '@angular/core';
import { EntityItemLite, ServiceConfiguration } from 'projects/boe-lib/src/public-api';
import { DisplayTypeEnum } from '../../models/display-type.enum';

import { DatahandlingService } from '../../services/datahandling.service';

@Component({
  selector: 'boe-detail',
  templateUrl: './boe-detail.component.html',
  styleUrls: ['./boe-detail.component.scss']
})
export class BOEDetailComponent implements OnInit {

  @Input() serviceConfiguration: ServiceConfiguration;

  @Input()
  get selectedId() {
    return this.datahandlingService.selectedNode.id;
  }
  set selectedId(selectedId: string) {
    const node = { id: selectedId} as EntityItemLite;
    this.datahandlingService.serviceConfiguration = this.serviceConfiguration;
    this.datahandlingService.selectedNodeChanged(node);
  }

  constructor(private datahandlingService: DatahandlingService) {
    this.datahandlingService.displayType = DisplayTypeEnum.DetailView;
  }

  ngOnInit() {
    this.datahandlingService.serviceConfiguration = this.serviceConfiguration;
  }
}
