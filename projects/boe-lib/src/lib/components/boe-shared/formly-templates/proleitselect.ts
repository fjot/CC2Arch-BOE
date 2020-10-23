import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'proleit-select',
  template: `
    <kendo-combobox
      [formControl]="formControl"
      [formlyAttributes]="field"

      [readOnly]="to.readonly"
      [attr.disabled]="to.disabled"
      [pSynchronValidator]="to.validatorFunction"

      [data]="to.options"
      [textField]="'label'"
      [valueField]="'value'"
      (valueChange)="to.change && to.change(field, $event)"
    >
    </kendo-combobox>
  `,
  styles: ['kendo-combobox.k-combobox { width : 100% }'],
})
export class ProLeitSelectComponent extends FieldType {
}