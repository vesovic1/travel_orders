import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { ServerErrorHandler } from '@core/services/server-error-handler.service';
import { Observable, Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public saving: boolean = false;

  public profile: any;
  
  public form: FormGroup = new FormGroup({});

  public oldPasswordFormControl: string = 'old_password';
  public newPasswordFormControl: string = 'new_password';
  public newPasswordConfirmFormControl: string = 'new_password_confirm';

  private _onDestroy = new Subject<void>();

  constructor(
    public dialogRef: DialogRef<any>,
    private api: ApiService,
    private errorHandler: ServerErrorHandler
  ) {
    this.setupForm();
  }

  ngOnInit(): void {
    this.getProfile();
  }

  private setupForm(): void {
    this.form.addControl(this.oldPasswordFormControl, new FormControl('', [Validators.required]));
    this.form.addControl(this.newPasswordFormControl, new FormControl('', [Validators.required]));
    this.form.addControl(this.newPasswordConfirmFormControl, new FormControl('', [Validators.required]));
  }

  public getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  private getProfile(): void {
    this.loading = true;
    this.api.get('/profile', {})
    .pipe(
      takeUntil(this._onDestroy),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (profile: any) => {
        this.profile = profile;
      }, error: (e: any) => {
        this.errorHandler.process(e);
      }
    })
  }

  private prepare(): Observable<any> {
    const formData = this.form.getRawValue();
    return this.api.post('/profile/password_reset', formData);
  }

  public save(): void {
    this.saving = true;
    this.prepare().pipe(
      takeUntil(this._onDestroy),
      finalize(() => {
        this.saving = false;
      })
    ).subscribe({
      next: () => {
        this.dialogRef.close(true);
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
