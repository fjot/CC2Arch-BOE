import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
            <div class="wrapperLayout" >
              <div class="wrapperCol1" >
                <ng-container *ngIf="to.required && to.hideRequiredMarker !== true">*</ng-container>
                <ng-container *ngIf="!to.required && to.hideRequiredMarker !== true">&nbsp;</ng-container>
                <label [attr.for]="id" class="col-sm-2 col-form-label" *ngIf="to.label">
                    {{ to.label }}
                </label>
              </div>
              <div class="col-sm-7 wrapperCol2" >
                <ng-template #fieldComponent></ng-template>
              </div>
            </div>`,
  styles: [`.wrapperLayout { 
              display: grid;
              grid-template-columns: 50% 50%; 
              margin: 5px
            }
            . wrapperCol1 {
              grid-column:1;
            }
            . wrapperCol2 {
              grid-column:2;
            }`
          ]
  })
export class FormlyHorizontalWrapperComponent extends FieldWrapper {
}
