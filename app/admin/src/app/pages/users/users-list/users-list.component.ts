import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { Subject, finalize, takeUntil } from 'rxjs';
import { UsersListTableSettings } from './table_settings/UsersList.table.settings';
import { ServerErrorHandler } from '@core/services/server-error-handler.service';
import { Dialog } from '@angular/cdk/dialog';
import { NotificationService } from '@features/notify/service/notify.service';
import { Title } from '@angular/platform-browser';
import { UserService } from '@features/users/services/UserService';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import _ from 'lodash';
import { UsersEditModalComponent } from '../users-edit-modal/users-edit-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnDestroy {

  public loading: boolean = true;
  public selectedUser: any = null;

  public users: any;
  public tableSettings: any = UsersListTableSettings;
  public search: string = '';

  @ViewChild(DataTableComponent) table!: DataTableComponent;

  private _onDestroy = new Subject<void>();

  constructor(
    private errorHandler: ServerErrorHandler,
    private dialog: Dialog,
    private userService: UserService,
    private notify: NotificationService,
    private title: Title,

  ) {
    this.title.setTitle(`TripGo - Korisnici`);
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  public searchChanged(val: any): void {
    this.search = val;
    this.refresh();
  }

  public metaChanged(data: any): void {
    this.refresh();
  }

  public refresh(resetPage: boolean = false): void {
    this.loading = true;

    let params: any = {};

    if (this.search) {
      params.search = this.search;
    }

    if (resetPage) {
      params.page = 1;
    }

    this.table.refresh(params)
    .pipe(
      takeUntil(this._onDestroy),
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (users: any) => {
        this.users = users;
      },
      error: (e: any) => {
        this.errorHandler.process(e, 'bottom-center');
        console.log(e);
      }
    });
  }

  public edit(item: any): void {
    const editModal: any = this.dialog.open(UsersEditModalComponent, {
      data: { user: item, settings: {} },
      disableClose: true,
      maxWidth: '50%',
    });

    editModal.closed
    .pipe(takeUntil(this._onDestroy))
    .subscribe((dialogResponse: any) => {
      if (dialogResponse.refresh) {
        this.refresh();
      }
    });
  }

  public editUser = (item: any) => {
    this.edit(item);
  }

  public remove(user: any): void {
    const confirmation = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Da li ste sigurni?',
        content: `Korisnik <b>${user.first_name} ${user.last_name}</b> će biti obrisan.`,
        closeLabel: 'Odustani',
        theme: 'danger',
        confirmLabel: 'Obriši',
      },
      disableClose: true,
    });

    confirmation.closed
    .pipe(takeUntil(this._onDestroy))
    .subscribe((dialogResponse: any) => {
      if (dialogResponse) {
        this.loading = true;
        this.userService.delete(user.id)
        .pipe(
          takeUntil(this._onDestroy),
          finalize(() => {
            this.loading = false;
          })
        ).subscribe({
          next: () => {
            this.notify.success('Korisnik je uspešno obrisan');
            this.refresh();
          },
          error: (err: any) => {
            this.errorHandler.process(err);
          }
        })
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
