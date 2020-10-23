import { FormlyFieldConfig } from '@ngx-formly/core';

export interface FormlyTabDefinition {
  tabName: string;
  isSelected: boolean;
  isPrimary: boolean;
  sortOrderIndex?: number;
  fields: FormlyFieldConfig[];
}
