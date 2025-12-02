import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { ServerErrorHandler } from '@core/services/server-error-handler.service';
import { NotificationService } from '@features/notify/service/notify.service';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-rename-file-modal',
  templateUrl: './rename-file-modal.component.html',
  styleUrl: './rename-file-modal.component.scss'
})
export class RenameFileModalComponent implements OnInit, OnDestroy {

  public saving: boolean = false;
  public isAddMode: boolean = true;

  public form: FormGroup = new FormGroup({});
  public nameFormControl: string = 'name';

  private _onDestroy = new Subject<void>();

  constructor(
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public data: any,
    private errorHandler: ServerErrorHandler,
    private notify: NotificationService,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.setupForm();
  }

  private setupForm(): void {

    let filename: string = '';

    if (this.data.document.type === 'file') {
      filename = this.data.document.file_name.split('.').slice(0, -1).join('.');
    } else {
      filename = this.data.document.file_name;
    }

    this.form.addControl(this.nameFormControl, new FormControl(filename, [Validators.required]));
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

    let post_data: any = {
      name: data.name,
      folder: this.data.selectedFolder
    };

    return this.api.patch(`${this.data.baseUrl}/${this.data.document.id}`, 'rename', post_data);

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

        this.notify.success('Uspešno ste izmenili naziv');

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
