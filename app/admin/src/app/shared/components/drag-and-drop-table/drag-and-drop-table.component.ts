import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ColTemplate } from '@shared/directives/TableColDirective';
import _ from 'lodash';

@Component({
  selector: 'app-drag-and-drop-table',
  templateUrl: './drag-and-drop-table.component.html',
  styleUrls: ['./drag-and-drop-table.component.scss']
})
export class DragAndDropTableComponent {
  @Input() settings: any;
  @Input() items?: any;
  @Input() rowClick!: (item: any) => void;
  @Input() selectedIndex?: any = null;
  @Input() emptyListMessage?:string;

  @ContentChildren(ColTemplate) templates!: QueryList<ColTemplate>;

  @Output() onDrop = new EventEmitter<any>();

  public templateDictionary: any= {};

  public rowClickable = false;

  public dragItem: any;

  @ViewChild('simpleTableBody') body!: ElementRef;

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngAfterContentInit() {
    this.templates.forEach((x:ColTemplate) => {
      this.templateDictionary[x.col] = x.template;
    });
  }

  ngOnInit(): void {
    this.rowClickable = this.rowClick !== undefined;
  }

  public scrollToIndex(index: number): void {
    let rows: any[] = this.body.nativeElement.querySelectorAll('.app-table-simple__row');
    let item: any = rows[index];
    item.scrollIntoView({top: 50, behavior: 'smooth' });

    setTimeout(() => {
      if (item.classList.contains('app-table-simple__row__pulse')) {
        this.renderer.removeClass(item, 'app-table-simple__row__pulse');
      } else {
        this.renderer.addClass(item, 'app-table-simple__row__pulse');
        setTimeout(() => {
          this.renderer.removeClass(item, 'app-table-simple__row__pulse');
        }, 500);
      }
    }, 500);

  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.onDrop.next({
      item: this.items[event.currentIndex],
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex
    });
  }

  started(item: any) {
    this.dragItem = item;
  }

  onRowClick(data: any) {
    if (this.rowClick !== undefined) {
      this.rowClick(data);
    }
  }
}
