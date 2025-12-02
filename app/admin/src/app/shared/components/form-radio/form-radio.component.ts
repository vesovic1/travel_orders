import { Component, forwardRef, Input } from '@angular/core';
import { IRadioItem } from './radio.interface';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormRadioComponent),
      multi: true
    }
  ]
})
export class FormRadioComponent implements ControlValueAccessor {

  @Input() formControl: FormControl = new FormControl();
  @Input() options: IRadioItem[] = [];
  @Input() orientation: string = 'vertical';
  @Input() groupName: string = 'radioGroup';

  public isDisabled: boolean = false;
  private innerValue!: string | number | boolean;

  onChange:any = () => {};
  onTouch:any = () => {};

  get value(): string | number | boolean {
    return this.innerValue;
  }

  set value(v: string | number | boolean) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.change(v);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;    
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  writeValue(value: string | number | boolean) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  change(value: string | number | boolean) {
    this.innerValue = value;
    this.onChange(value);
    this.onTouch(value);
  }

}
