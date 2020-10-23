// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import '@angular/localize/init'

import '@progress/kendo-angular-intl';

import '@progress/kendo-angular-intl/locales/en/all';
import '@progress/kendo-angular-intl/locales/de/all';
import '@progress/kendo-angular-intl/locales/es/all';
import '@progress/kendo-angular-intl/locales/fr/all';
import '@progress/kendo-angular-intl/locales/nl/all';
import '@progress/kendo-angular-intl/locales/pt/all';
import '@progress/kendo-angular-intl/locales/ru/all';
import '@progress/kendo-angular-intl/locales/zh/all';

import '@proleit/sdk-services-translation/locales/en/sdkTranslation';
import '@proleit/sdk-services-translation/locales/de/sdkTranslation';
import '@proleit/sdk-services-translation/locales/es/sdkTranslation';
import '@proleit/sdk-services-translation/locales/fr/sdkTranslation';
import '@proleit/sdk-services-translation/locales/nl/sdkTranslation';
import '@proleit/sdk-services-translation/locales/pt/sdkTranslation';
import '@proleit/sdk-services-translation/locales/ru/sdkTranslation';
import '@proleit/sdk-services-translation/locales/zh/sdkTranslation';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
