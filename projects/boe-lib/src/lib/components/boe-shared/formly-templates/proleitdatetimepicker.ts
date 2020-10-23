import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'proleit-date-time-picker',
  template: `
    <p-date-time-picker
      [formControl]="formControl"
      [formlyAttributes]="field"
      class="formlyEditor"
      [(ngModel)]="selectedDate"

      [readOnly]="to.readonly"
      [attr.disabled]="to.disabled"
      [pSynchronValidator]="to.validatorFunction"
      [dateFormat]="to.format"

      (valueChange)="handleChange($event)"
    ></p-date-time-picker>
  `,
  styles: ['.formlyEditor { width: 100%; }']
})
export class ProLeitDateTimePickerComponent extends FieldType implements OnInit {
  public selectedDate: Date;

  ngOnInit(): void {
    if(this.model && this.key) {
      let tmp = this.model[this.key.toString()];
      if(tmp) {
        this.selectedDate = new Date(tmp);
      }
    }
  }

  public handleChange(value: Date) {
    if(this.model && this.key) {
      this.model[this.key.toString()] = value;
    }
  }
}
