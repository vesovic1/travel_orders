import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextareaComponent),
      multi: true
    }
  ]
})
export class FormTextareaComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() hideLabel: boolean = false;
  @Input() hideErrors: boolean = false;
  @Input() formControl: FormControl = new FormControl();

  public id:string = '';
  public isRequired: boolean = false;
  public value: any;
  public isDisabled: boolean = false;
  @Input() maxRows = 10;
  @Input() minRows = 1;

  ngOnInit(): void {
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

}

