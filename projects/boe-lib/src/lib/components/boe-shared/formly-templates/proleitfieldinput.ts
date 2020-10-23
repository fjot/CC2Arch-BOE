import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'proleit-field-input',
  template: `
    <p-inputfield 
      [formControl]="formControl" 
      [formlyAttributes]="field"
      class="formlyEditor"

      [readOnly]="to.readonly"
      [attr.disabled]="to.disabled"
      [type]="to.type === 'number' ? 'number' : 'text'"
      [pSynchronValidator]="to.validatorFunction"
      
      [unit]="to.unit"
      [format]="to.format"
    ></p-inputfield>`,
  styles: ['.formlyEditor { width: 100%; }']
})
export class ProLeitFieldInputComponent extends FieldType {
}
