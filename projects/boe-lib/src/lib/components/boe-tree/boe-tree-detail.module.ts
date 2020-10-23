import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BusinessObjectEntityEditorConfig } from 'projects/boe-lib/src/public-api';

import { BOEDetailModule } from '../boe-detail/boe-detail.module';
import { BOESharedModule } from '../boe-shared/boe-shared.module';
import { BOETreeDetailComponent } from './boe-tree-detail.component';

@NgModule({
  declarations: [BOETreeDetailComponent ],
  imports: [ 
    BOESharedModule, 
    BOEDetailModule ],
  exports: [BOETreeDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BOETreeDetailModule {
  public static forRoot(configuration: BusinessObjectEntityEditorConfig): ModuleWithProviders<BOETreeDetailModule> {
    return {
      ngModule: BOETreeDetailModule,
      providers: [
        {
            provide: BusinessObjectEntityEditorConfig,
            useValue: configuration,
        },
      ],
    };
  }
 }
