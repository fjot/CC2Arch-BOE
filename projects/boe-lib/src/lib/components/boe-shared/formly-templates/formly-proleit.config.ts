import { ConfigOption } from '@ngx-formly/core';
import { FormlyHorizontalWrapperComponent,
         ProLeitFieldInputComponent,
         ProLeitCheckBoxComponent,
         ProLeitDateTimePickerComponent,
         ProLeitSelectComponent,
         ProLeitMultiSelectComponent
        } from '.';

export const PROLEIT_FORMLY_CONFIG: ConfigOption = {
  types: [
    {
      name: 'pinput',
      component: ProLeitFieldInputComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'pcheckbox',
      component: ProLeitCheckBoxComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'pdatetime',
      component: ProLeitDateTimePickerComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'pselect',
      component: ProLeitSelectComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'pmultiselect',
      component: ProLeitMultiSelectComponent,
      wrappers: ['form-field'],
    },
  ],
  wrappers: [
    { name: 'form-field', component: FormlyHorizontalWrapperComponent },
  ],
};
