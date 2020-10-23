import { FormArray } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { FormlyTabDefinition } from './formly-tab-definition.model';

export interface DetailData {
  visible: boolean;
  form: FormArray;
  tabs: FormlyTabDefinition[];
  options: FormlyFormOptions[];
  model: any;
}
