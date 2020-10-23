import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IntlService, CldrIntlService } from '@progress/kendo-angular-intl';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogModule, DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';

import './locales';

import { SdkComponentsDateinputsModule } from '@proleit/sdk-components-dateinputs';
import { SdkComponentsValidationModule } from '@proleit/sdk-components-validation';
import { SdkComponentsCommonModule } from '@proleit/sdk-components-common';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyKendoModule } from '@ngx-formly/kendo';
import { FormlySelectModule as FormlyCoreSelectModule } from '@ngx-formly/core/select';
import { PROLEIT_FORMLY_CONFIG } from './formly-templates/formly-proleit.config';
import { FormlyHorizontalWrapperComponent } from './formly-templates/horizontal-wrapper.component';

import {
  FilterViewComponent,
  TreeViewComponent,
  ListViewComponent,
  DetailViewComponent,
  NotificationComponent,
  AddDialogComponent,
  DeleteDialogComponent
} from './UI-Parts';

import {
  ProLeitFieldInputComponent,
  ProLeitCheckBoxComponent,
  ProLeitDateTimePickerComponent,
  ProLeitSelectComponent,
  ProLeitMultiSelectComponent
} from './formly-templates';

@NgModule({
  declarations: [
    NotificationComponent,
    FormlyHorizontalWrapperComponent,
    FilterViewComponent,
    TreeViewComponent,
    ListViewComponent,
    DetailViewComponent,
    ProLeitFieldInputComponent,
    ProLeitCheckBoxComponent,
    ProLeitDateTimePickerComponent,
    ProLeitSelectComponent,
    ProLeitMultiSelectComponent,
    AddDialogComponent,
    DeleteDialogComponent
  ],
  exports: [
    FilterViewComponent,
    TreeViewComponent,
    ListViewComponent,
    DetailViewComponent,
    AddDialogComponent,
    DeleteDialogComponent
  ],
  imports: [BrowserModule,
    FormlyCoreSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DialogsModule,
    LayoutModule,
    TreeViewModule,
    DropDownsModule,
    ButtonsModule,
    DateInputsModule,
    InputsModule,
    SdkComponentsDateinputsModule,
    SdkComponentsValidationModule,
    SdkComponentsCommonModule,
    NotificationModule,
    FormlyKendoModule,
    FormlyModule.forRoot(PROLEIT_FORMLY_CONFIG),
  ],
  providers: [
    NotificationComponent,
    CldrIntlService,
    { provide: IntlService, useExisting: CldrIntlService },
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BOESharedModule { }
