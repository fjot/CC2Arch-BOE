import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'proleit-multiselect',
  template: `
    <kendo-multiselect #cMulitSelect
      [kendoMultiSelectSummaryTag]="1"
      [kendoDropDownFilter]="filterSettings"

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
      <ng-template kendoMultiSelectItemTemplate let-dataItem>
        <p-checkbox [ngModel]="isItemSelected(dataItem)"></p-checkbox>
        {{dataItem.label}}
      </ng-template>
    </kendo-multiselect>`,
  styles: ['kendo-multiselect.k-widget.k-multiselect.k-header { width : 100% }']
})
export class ProLeitMultiSelectComponent extends FieldType {

  @ViewChild('cMulitSelect')
  ngModel: NgModel;

  filterSettings = { caseSensitive: false, operator: 'startsWith' };

  isItemSelected(selectedItem): number {
    return (this.ngModel && this.ngModel.value && this.ngModel.value.find(item => item.value === selectedItem.value) ? 1 : 0);
  }
}
