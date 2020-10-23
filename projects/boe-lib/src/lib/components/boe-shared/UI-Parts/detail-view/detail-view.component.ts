import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

import { FormArray } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';


import { DatahandlingService } from '../../../../services/datahandling.service';
import { DetailData, FormlyTabDefinition } from 'projects/boe-lib/src/public-api';

@Component({
  selector: 'lib-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(private datahandlingService: DatahandlingService) { }

  formNotValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  visible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  multiTabLayout$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  singleTabLayout$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  form: FormArray;
  tabs: FormlyTabDefinition[];
  options: FormlyFormOptions[];
  model: any;

  showUnsavedQuestion$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.subscriptions.add(
      this.datahandlingService.detailViewData$
        .subscribe(data => this.setViewData(data)));

    this.subscriptions.add(
      this.datahandlingService.showUnsavedQuestion$
        .subscribe(showDialog => this.showUnsavedQuestion$.next(showDialog)));

    this.subscriptions.add(
      this.datahandlingService.modelHasChanges$
        .subscribe(b => this.isFormValid()));
  }

  ngAfterViewInit() {
    this.isFormValid();
  }

  isFormValid() {
    let valid = true;

    for (let i = 0; i < this.form.length; i++) {
      valid = valid && this.form.at(i).valid;
    }

    const isValid = valid && this.datahandlingService.modelHasChanges$.getValue();
    this.formNotValid$.next(!isValid);
  }

  private setViewData(detailData: DetailData) {
    this.visible$.next(detailData.visible);

    if (detailData.visible) {
      this.multiTabLayout$.next(detailData.tabs && detailData.tabs.length > 1 && detailData.visible);
      this.singleTabLayout$.next(detailData.tabs && detailData.tabs.length === 1 && detailData.visible);
      this.tabs = detailData.tabs;
      this.options = detailData.options;
      this.model = detailData.model;
      this.form = detailData.form;
    } else {
      this.multiTabLayout$.next(false);
      this.singleTabLayout$.next(false);
      this.tabs = undefined;
      this.options = undefined;
      this.model = undefined;
      this.form = new FormArray([]);
    }
  }

  modelChange(model) {
    this.datahandlingService.detailViewModelChanged();
  }

  submit() {
    this.datahandlingService.updateEntity(this.model);
  }

  saveDialog() {
    this.datahandlingService.updateEntity(this.model);
  }

  rejectDialog() {
    this.datahandlingService.rejectSaveDialog();
  }

  closeDialog() {
    this.datahandlingService.saveDialogCancel();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
