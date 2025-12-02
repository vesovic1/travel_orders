import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { ServerErrorHandler } from '@core/services/server-error-handler.service';
import { NotificationService } from '@features/notify/service/notify.service';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-folder-modal',
  templateUrl: './new-folder-modal.component.html',
  styleUrl: './new-folder-modal.component.scss'
})
export class NewFolderModalComponent implements OnDestroy {

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
    this.setupForm();
  }

  private setupForm(): void {
    this.form.addControl(this.nameFormControl, new FormControl(null, [Validators.required]));
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

    return this.api.post(`${this.data.baseUrl}/folder`, post_data);

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

        this.notify.success('Folder je uspešno kreiran');

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
