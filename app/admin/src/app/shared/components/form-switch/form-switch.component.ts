import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-switch',
  templateUrl: './form-switch.component.html',
  styleUrl: './form-switch.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSwitchComponent),
      multi: true
    }
  ]
})
export class FormSwitchComponent implements ControlValueAccessor {

  @Input() checked: boolean = false;

  onChange:any = () => {};
  onTouch:any = () => {};

  @ViewChild('inputSwitch') inputSwitch!: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: boolean) {
    this.checked = e;
    this.onChange(e);
  }
}