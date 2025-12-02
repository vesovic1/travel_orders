import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { ServerErrorHandler } from '@core/services/server-error-handler.service';
import { NotificationService } from '@features/notify/service/notify.service';
import { ISelectItem } from '@shared/components/form-select/select.interface';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-move-file-modal',
  templateUrl: './move-file-modal.component.html',
  styleUrl: './move-file-modal.component.scss'
})
export class MoveFileModalComponent implements OnDestroy {

  public saving: boolean = false;
  public isAddMode: boolean = true;

  public form: FormGroup = new FormGroup({});
  public folderFormControl: string = 'folder';

  public folderOptions: ISelectItem[] = [];

  private _onDestroy = new Subject<void>();

  constructor(
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public data: any,
    private errorHandler: ServerErrorHandler,
    private notify: NotificationService,
    private api: ApiService
  ) {
    this.getFolders();
    this.setupForm();
  }

  private setupForm(): void {
    this.form.addControl(this.folderFormControl, new FormControl(null, [Validators.required]));
  }

  private getFolders(): void {
    this.api.get(`${this.data.baseUrl}/folder`, {})
    .pipe(
      takeUntil(this._onDestroy)
    ).subscribe({
      next: (folders: any[]) => {

        folders.unshift({
          document_name: 'Početni',
          id: 'root',
        });

        this.folderOptions = folders.map((folder: any) => {
          return { value: folder.id, text: folder.document_name };
        });

      },
      error: (e: any) => {
        this.errorHandler.process(e);
      }
    });
  }

  public getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  public close(refresh:boolean):void {
    this.dialogRef.close({
      refresh: refresh,
      data: null
    });
  }

  private prepare(): Observable<any> {
    const data: any = this.form.getRawValue();
    return this.api.post(`${this.data.baseUrl}/${this.data.document.id}/move/${data.folder}`, {});
  }

  public save(): void {
    if (this.saving) {
      return;
    }

    this.saving = true;

    this.prepare().pipe(
      takeUntil(this._onDestroy),
      finalize(() => {
        this.saving = false;
      })
    ).subscribe({
      next: (response: any) => {

        this.notify.success('Podaci su uspešno sačuvani');

        this.dialogRef.close({
          refresh: true,
          data: response
        });
      },
      error: (e: any) => {
        this.errorHandler.process(e);
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
