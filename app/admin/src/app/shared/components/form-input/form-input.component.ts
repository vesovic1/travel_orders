import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements ControlValueAccessor, OnInit {

  @Input() size: string = '';
  @Input() hideLabel: boolean = false;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() min: any = null;
  @Input() max: any = null;
  @Input() formControl: FormControl = new FormControl();

  public id:string = '';
  public isRequired: boolean = false;
  public value: any;
  public isDisabled: boolean = false;

  ngOnInit(): void {
    this.isRequired = this.formControl.hasValidator(Validators.required);
    this.id = this.label.toLowerCase().replace(/\s/g, '');
  }

  public changed!: (value: string) => void;
  public touched!: () => void;

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.value = value;
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

}
