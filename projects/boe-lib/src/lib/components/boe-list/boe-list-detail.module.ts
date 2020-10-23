import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BusinessObjectEntityEditorConfig } from '../../models/classes/business.object.entity.editor.config';
import { BOEDetailModule } from '../boe-detail/boe-detail.module';
import { BOESharedModule } from '../boe-shared/boe-shared.module';
import { BOEListDetailComponent } from './boe-list-detail.component';

@NgModule({
  declarations: [BOEListDetailComponent,],
  imports: [
    BOESharedModule,
    BOEDetailModule],
  exports: [BOEListDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BOEListDetailModule {
  public static forRoot(configuration: BusinessObjectEntityEditorConfig): ModuleWithProviders<BOEListDetailModule> {
    return {
      ngModule: BOEListDetailModule,
      providers: [
        {
          provide: BusinessObjectEntityEditorConfig,
          useValue: configuration,
        },
      ],
    };
  }
}
