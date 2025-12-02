import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ColTemplate } from '@shared/directives/TableColDirective';
import { DetailsTemplate } from '@shared/directives/TableDetailsDirective';
import _ from 'lodash';

@Component({
  selector: 'app-data-table-simple',
  templateUrl: './data-table-simple.component.html',
  styleUrls: ['./data-table-simple.component.scss']
})
export class DataTableSimpleComponent {

  @Input() settings: any;
  @Input() title?: any;
  @Input() items?: any;
  @Input() isExpandable: boolean = false; // if true, set listItem.expand on true or false
  @Input() rowClick!: (item: any) => void;
  @Input() selectedIndex?: any = null;
  
  @Input() emptyListMessage?:string;

  @ContentChildren(ColTemplate) templates!: QueryList<ColTemplate>;
  @ContentChildren(DetailsTemplate) detailsTemplates!: QueryList<DetailsTemplate>;

  public itemsFiltered!: Array<any>;

  public rowClickable = false;

  constructor() {
  }

  public templateDictionary: any= {};
  public templateDetailsDictionary: any= {};

  ngAfterContentInit() {
    this.templates.forEach((x:ColTemplate) => {
      this.templateDictionary[x.col] = x.template;
    });

    if (this.isExpandable) {
      this.detailsTemplates.forEach((x:DetailsTemplate) => {
        this.templateDetailsDictionary.rowDetail = x.template;
      });
    }
  }

  ngOnInit(): void {
    this.rowClickable = this.rowClick !== undefined;
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.items) {
      this.itemsFiltered = _.cloneDeep(change.items.currentValue);
    }
  }

  onRowClick(data: any) {
    if (this.rowClick !== undefined) {
      this.rowClick(data);
    }
  }
}
