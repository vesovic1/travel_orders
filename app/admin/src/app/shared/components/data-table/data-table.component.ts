import {
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { ApiService } from '@core/services/api.service';
import { ColTemplate } from '@shared/directives/TableColDirective';
import { paginate } from '@shared/utils/paginate';
import { tap } from 'rxjs';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
    /*INPUTS*/

    @Input() settings: any;
    @Input() items?: any;
    @Input() title?: any;
    @Input() paginate: boolean = true;
    @Input() rowClick!: (item: any) => void;
    @Input() pageSize: number = 20;
    @Input() checkbox: boolean = false;
    @Input() rowClass: string = '';

    /* OUTPUTS */

    @Output() metaChanged = new EventEmitter<any>();
    @Output() selectionChange = new EventEmitter<boolean>();

    /* VARIABLES */

    public limits: number[] = [5, 10, 15, 20, 50];
    public pager: any = {};
    public currentPage: number = 1;
    public sortData: any = { code: '', type: 'asc' };
    public rowClickable = false;
    public templateDictionary: any = {};

    public lastSearch = null;

    public from: number = 1;
    public to: number = 20;

    public allSelected: boolean = false;
    public totalSelected: number = 0;

    public selectedItems: any[] = [];

    /* OTHER */

    @ContentChildren(ColTemplate) templates!: QueryList<ColTemplate>;
    @ViewChild('dataTableBody') body!: ElementRef;

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.rowClickable = this.rowClick !== undefined;
    }

    setDefaultSort(): void {
        if (this.settings.defaultSort) {
            this.sortData.code = this.settings.defaultSort.code;
            this.sortData.type = this.settings.defaultSort.type;
            this.sort();
        }
    }

    ngOnChanges(change: SimpleChanges) {
        if (change.items) {
            if (this.items && this.paginate) {
                // this.currentPage = this.items._meta.page;
                // this.pageSize = this.items._meta.pageSize;
                this.pager = paginate(
                    this.items._meta.total,
                    this.currentPage,
                    this.pageSize,
                );

                this.from = this.pager.currentPage
                    ? (this.pager.currentPage - 1) * this.pager.pageSize + 1
                    : 0;
                this.to = Math.min(
                    this.pager.totalItems,
                    this.from + this.pageSize - 1,
                );
            }
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((x: ColTemplate) => {
            this.templateDictionary[x.col] = x.template;
        });
    }

    sortBy(col: any): void {
        if (col.sort) {
            if (col.code !== this.sortData.code) {
                this.sortData.code = col.code;
                this.sortData.type = 'asc';
            } else {
                if (this.sortData.type === 'asc') {
                    this.sortData.type = 'desc';
                } else {
                    this.sortData.code = '';
                    this.sortData.type = 'asc';
                }
            }
            this.sort();
        }
    }

    sort(): void {
        this.currentPage = 1;
        this.metaChanged.next({
            page: this.currentPage,
            pageSize: this.pageSize,
            sort: this.getSortConfig(),
        });
    }

    private getSortConfig(): string {
        return this.sortData.code !== ''
            ? `${this.sortData.code} ${this.sortData.type}`
            : this.sortData.code;
    }

    onRowClick(data: any) {
        if (this.rowClick !== undefined) {
            this.rowClick(data);
        }
    }

    setPage(page: number) {
        this.allSelected = false;
        this.totalSelected = 0;
        this.currentPage = page;
        this.body.nativeElement.scrollTop = 0;
        this.metaChanged.next({
            page: this.currentPage,
            pageSize: this.pageSize,
            sort: this.getSortConfig(),
        });
    }

    showPerPage(pageSize: number): void {
        this.allSelected = false;
        this.totalSelected = 0;
        this.currentPage = 1;
        this.metaChanged.next({
            page: this.currentPage,
            pageSize: pageSize,
            sort: this.getSortConfig(),
        });
    }

    setAll(): void {
        this.items.rows.map((i: any) => {
            i.selected = this.allSelected;
            return i;
        });

        this.totalSelected = this.items.rows.filter((i: any) => {
            return i.selected;
        }).length;
        this.selectionChange.next(true);
    }

    changeCheck(): void {
        this.totalSelected = this.items.rows.filter((i: any) => {
            return i.selected;
        }).length;

        this.allSelected = this.items.rows.length === this.totalSelected;
        this.selectionChange.next(true);
    }

    refresh(extendParams: any) {
        if (extendParams.search) {
            if (!this.lastSearch || this.lastSearch !== extendParams.search) {
                this.currentPage = 1;
                this.lastSearch = extendParams.search;
            }
        } else {
            if (this.lastSearch) {
                this.currentPage = 1;
                this.lastSearch = null;
            }
        }

        if (extendParams.page) {
            this.currentPage = extendParams.page;
        }

        const paginateParams = this.paginate
            ? {page: this.currentPage, pageSize: this.pageSize,}
            : {};

        const params = {
            ...paginateParams,
            orderBy: this.getSortConfig(),
            ...extendParams,
        };

        return this.api.get(this.settings.resource, params);
    }
}
