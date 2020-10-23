import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { DatahandlingService } from 'projects/boe-lib/src/public-api';


@Component({
  selector: 'lib-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  addEntityVisible: boolean;
  createForm: FormGroup = new FormGroup({});
  createFieldLayout: FormlyFieldConfig[];
  createModel: any;

  constructor(private datahandlingService: DatahandlingService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.datahandlingService.addEntityLayout$
        .subscribe(data => {
          this.createFieldLayout = data;
          this.createForm = new FormGroup({});
          this.createModel = {};
        }));

    this.subscriptions.add(
      this.datahandlingService.addEntityVisible$
        .subscribe(visible => this.addEntityVisible = visible));
  }

  closeAddDialog() {
    this.datahandlingService.hideAddEntity();
  }

  submit() {
    this.datahandlingService.createEntity(this.createModel);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
