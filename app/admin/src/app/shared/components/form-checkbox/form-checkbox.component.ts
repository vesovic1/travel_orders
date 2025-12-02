import { Component, forwardRef, ViewChild, Renderer2, AfterViewInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCheckboxComponent),
      multi: true
    }
  ]
})
export class FormCheckboxComponent implements ControlValueAccessor, AfterViewInit {

  public checked: boolean = false;
  public isDisabled: boolean = false;
  @Input() compact: boolean = false;
  @Input() partialSelection: boolean = false;

  onChange:any = () => {};
  onTouch:any = () => {};

  @ViewChild('inputCheckbox') inputCheckbox!: any;

  constructor(
    private readonly renderer: Renderer2
  ) {
  }

  ngAfterViewInit() {
    this.renderer.setProperty(this.inputCheckbox.nativeElement, 'disabled', this.isDisabled);
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

  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: boolean) {
    this.checked = e;
    this.onChange(e);
  }
}
