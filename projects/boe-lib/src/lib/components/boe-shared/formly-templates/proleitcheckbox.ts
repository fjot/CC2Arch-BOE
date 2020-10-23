import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'proleit-checkbox',
  template: `
    <p-checkbox
      [formControl]="formControl" 
      [formlyAttributes]="field"
      class="formlyEditorCheckbox" 
      
      [attr.disabled]="to.disabled"
    ></p-checkbox>`,
    styles: ['.formlyEditorCheckbox { margin-top : 10px }']
})
export class ProLeitCheckBoxComponent extends FieldType {
}
