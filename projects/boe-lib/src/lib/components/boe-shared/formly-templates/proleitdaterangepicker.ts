import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'proleit-date-range-picker',
  template: `
    <p-date-range-picker
      [formControl]="formControl" 
      [formlyAttributes]="field"
      class="formlyEditor"

      [readOnly]="to.readonly"
      [attr.disabled]="to.disabled"
      [type]="to.type"
      [pSynchronValidator]="to.validatorFunction"

      [dateFormat]="to.format"
      [timePickerFormat]="to.timeFormat"
    ></p-date-range-picker>
  `,
  styles: ['.formlyEditor { width: 100%; }']
})
export class ProLeitDateRangePickerComponent extends FieldType {
}
