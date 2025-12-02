import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { ISelectItem } from '../form-select/select.interface';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-page-select-filter',
  templateUrl: './page-select-filter.component.html',
  styleUrls: ['./page-select-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PageSelectFilterComponent),
      multi: true
    }
  ]
})
export class PageSelectFilterComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() appendTo: string = '';
  @Input() options: ISelectItem[] = [];
  @Input() formControl: FormControl = new FormControl();
  @Input() searchable: boolean = false;
  @Input() customTemplate: boolean = false;
  @Input() loading: boolean = false;
  @Input() closeOnSelect: boolean = true;

  @Output() onSearch = new EventEmitter<string>();

  public id:string = '';
  public value: any;

  @ViewChild('appSelectFilter') appSelectFilter!: NgSelectComponent;

  public selectedItem: any = null;

  ngOnInit(): void {
    this.id = this.label.toLowerCase().replace(/\s/g, '');
  }

  ngAfterViewInit(): void {
    this.formControl.valueChanges.subscribe(val => {
      this.selectedItem = this.options.find((option: any) => {
        return option.value === val;
      });
    });
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

  writeValue(value: any) {
    this.value = value;
  }

  clear(): void {
    this.formControl.setValue(null);
    this.selectedItem = null;
  }

  open(): void {
    if (!this.appSelectFilter.isOpen) {
      this.appSelectFilter.open();
      this.appSelectFilter.focus();
    }
  }
}
