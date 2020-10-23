import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BusinessObjectEntityEditorConfig } from '../../models/classes/business.object.entity.editor.config';
import { BOESharedModule } from '../boe-shared/boe-shared.module';
import { BOEDetailComponent } from './boe-detail.component';

@NgModule({
  declarations: [BOEDetailComponent],
  imports: [BOESharedModule],
  exports: [BOEDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BOEDetailModule {
  public static forRoot(configuration: BusinessObjectEntityEditorConfig): ModuleWithProviders<BOEDetailModule> {
    return {
      ngModule: BOEDetailModule,
      providers: [
        {
          provide: BusinessObjectEntityEditorConfig,
          useValue: configuration,
        },
      ],
    };
  }
}
