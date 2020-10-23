import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { SdkComponentsFilterbarModule } from '@proleit/sdk-components-filterbar';
import { IntlService, CldrIntlService } from '@progress/kendo-angular-intl';

import '@progress/kendo-angular-intl/locales/en/all';
import '@progress/kendo-angular-intl/locales/de/all';
import '@progress/kendo-angular-intl/locales/es/all';
import '@progress/kendo-angular-intl/locales/fr/all';
import '@progress/kendo-angular-intl/locales/nl/all';
import '@progress/kendo-angular-intl/locales/pt/all';
import '@progress/kendo-angular-intl/locales/ru/all';
import '@progress/kendo-angular-intl/locales/zh/all';;
import '@proleit/sdk-services-translation/locales/en/sdkTranslation';
import '@proleit/sdk-services-translation/locales/de/sdkTranslation';
import '@proleit/sdk-services-translation/locales/es/sdkTranslation';
import '@proleit/sdk-services-translation/locales/fr/sdkTranslation';
import '@proleit/sdk-services-translation/locales/nl/sdkTranslation';
import '@proleit/sdk-services-translation/locales/pt/sdkTranslation';
import '@proleit/sdk-services-translation/locales/ru/sdkTranslation';
import '@proleit/sdk-services-translation/locales/zh/sdkTranslation';
import { SdkServicesBaseModule } from '@proleit/sdk-services-base';
import { BotTreeEditorEquipmentComponent } from './components/bottreeeditorequipment/bottreeeditorequipment.component';
import { BotListEditorEquipmentComponent } from './components/botlisteditorequipment/botlisteditorequipment.component';
import { BotDetailEditorEquipmentComponent } from './components/botdetaileditorequipment/botdetaileditorequipment.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { BotListEditorMaterialComponent } from './components/botlisteditormaterial/botlisteditormaterial.component';
import { BOEDetailModule, BOEListDetailModule, BOETreeDetailModule } from 'projects/boe-lib/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    BotTreeEditorEquipmentComponent,
    BotListEditorEquipmentComponent,
    BotDetailEditorEquipmentComponent,
    BotListEditorMaterialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BOEDetailModule.forRoot({restApiServer: environment.redirectUrl}),
    BOEListDetailModule.forRoot({restApiServer: environment.redirectUrl}),
    BOETreeDetailModule.forRoot({restApiServer: environment.redirectUrl}),
    FormlyModule,
    SdkComponentsFilterbarModule,
    SdkServicesBaseModule,
    ReactiveFormsModule,
    NotificationModule,
    BrowserAnimationsModule,
    TreeViewModule,
    InputsModule,
    ProgressBarModule,
    TooltipModule,
  ],
  providers: [
    { provide: 'pitBaseUrl', useValue: environment.serverUrl },
    { provide: 'ClientId', useValue: environment.clientId },
    CldrIntlService,
    { provide: IntlService, useExisting: CldrIntlService },
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
