import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestService } from '@features/test/services/test.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { tableSettings } from './table.settings';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
    public tableSettings = tableSettings;
    public loading: boolean = true;

    public search: string = '';

    public results: any;

    protected _onDestroy = new Subject<void>();

    constructor(private _service: TestService) {}

    ngOnInit(): void {
        this.refresh();
    }

    private refresh(): void {
        this.loading = true;
        this._service
            .fetchTableData({
                search: this.search,
            })
            .pipe(
                takeUntil(this._onDestroy),
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (results) => {
                    this.results = results;
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }

    public searchChanged(val: string): void {
        console.log(val);
    }

    public metaChanged(data: any): void {
        this.refresh();
    }

    ngOnDestroy(): void {}
}
