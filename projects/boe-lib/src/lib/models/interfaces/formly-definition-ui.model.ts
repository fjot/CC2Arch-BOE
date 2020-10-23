import { FormlyTabDefinition } from './formly-tab-definition.model';

export interface FormlyDefinitionUI {
  entityId: string;
  tabs: FormlyTabDefinition[];
  model: any;
}
