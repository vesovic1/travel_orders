import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerComponent } from 'ng2-date-picker';

@Component({
  selector: 'app-page-date-filter',
  templateUrl: './page-date-filter.component.html',
  styleUrls: ['./page-date-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PageDateFilterComponent),
      multi: true
    }
  ]
})
export class PageDateFilterComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = '';
  @Input() mode: any = 'day';
  @Input() format: string = 'dd.MM.YYYY.';
  @Input() formControl: FormControl = new FormControl();

  public id:string = '';
  public value: any;

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

  writeValue(value: any) {
    this.value = value;
  }

  open():void {
    this.appDatePicker.api.open();
  }

  clear(): void {
    this.formControl.setValue(null);
  }
}
