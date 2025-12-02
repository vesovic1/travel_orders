import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, takeUntil, debounceTime, distinctUntilChanged, tap, Subject } from 'rxjs';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  public isSearchMode: boolean = false;
  @ViewChild('searchInput') searchInput!: ElementRef;

  @Output() valueChanged = new EventEmitter<string>();
  @Input() placeholder?: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  protected _onDestroy = new Subject<void>();

  ngAfterViewInit() {

    fromEvent(this.searchInput.nativeElement, 'keyup')
    .pipe(
        takeUntil(this._onDestroy),
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
            this.isSearchMode = this.searchInput.nativeElement.value.length > 0;
            if (this.searchInput.nativeElement.value.length >= 3 || this.searchInput.nativeElement.value.length === 0) {
              this.valueChanged.next(this.searchInput.nativeElement.value)
            }
        })
    ).subscribe();
  }

  resetSearch() {
    this.resetSearchPlain();
    this.valueChanged.next('')
  }

  resetSearchPlain() {
    this.searchInput.nativeElement.value = '';
    this.isSearchMode = false;
  }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}