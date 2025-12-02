import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DatePickerComponent } from 'ng2-date-picker';

@Component({
  selector: 'app-form-date-picker',
  templateUrl: './form-date-picker.component.html',
  styleUrls: ['./form-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDatePickerComponent),
      multi: true
    }
  ]
})
export class FormDatePickerComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() mode: any = 'day';
  @Input() format: string = 'DD.MM.YYYY.';
  @Input() formControl: FormControl = new FormControl();
  @Input() hideErrors: boolean = false;

  public id:string = '';
  public isRequired: boolean = false;
  public value: any;
  public isDisabled: boolean = false;

  public config: any;

  @ViewChild('appDatePicker') appDatePicker!: DatePickerComponent;

  ngOnInit(): void {
    this.config = {
      firstDayOfWeek: 'mo',
      // closeOnSelect: false,
      showGoToCurrent: true,
      dayBtnFormat: 'D',
      monthFormat: 'MMMM YYYY.',
      format: this.format
    };
    this.isRequired = this.formControl.hasValidator(Validators.required);
    this.id = this.label.toLowerCase().replace(/\s/g, '');
  }

  public changed!: (value: string) => void;
  public touched!: () => void;

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any) {
    this.value = value;
  }

  open():void {
    if (this.isDisabled) {
      return;
    }
    this.appDatePicker.api.open();
  }

}
