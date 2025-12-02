import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-color-picker',
  templateUrl: './form-color-picker.component.html',
  styleUrls: ['./form-color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormColorPickerComponent),
      multi: true
    }
  ]
})
export class FormColorPickerComponent implements ControlValueAccessor, OnInit {

  @Input() size: string = '';
  @Input() hideLabel: boolean = false;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() formControl: FormControl = new FormControl();
  
  public id:string = '';
  public isRequired: boolean = false;
  public value: any;
  
  ngOnInit(): void {
    this.isRequired = this.formControl.hasValidator(Validators.required);
    this.id = this.label.toLowerCase().replace(/\s/g, '');
  }

  public changed!: (value: string) => void;
  public touched!: () => void;

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;    
  }

  writeValue(value: any) {
    this.value = value;
  }
}