import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ISelectItem } from './select.interface';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelectComponent),
      multi: true
    }
  ]
})
export class FormSelectComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() appendTo: string = '';
  @Input() options: ISelectItem[] = [];
  @Input() formControl: FormControl = new FormControl();
  @Input() searchable: boolean = false;
  @Input() clearable: boolean = false;
  @Input() multiple: boolean = false;
  @Input() closeOnSelect: boolean = true;
  @Input() customTemplate: boolean = false;
  @Input() loading: boolean = false;
  @Input() hideErrors: boolean = false;

  @Output() onSearch = new EventEmitter<string>();

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

  customSearchFn(e: any) {
    this.onSearch.next(e.term);
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