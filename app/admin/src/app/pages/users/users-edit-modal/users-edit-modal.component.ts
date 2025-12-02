import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerErrorHandler } from '@core/services/server-error-handler.service';
import { NotificationService } from '@features/notify/service/notify.service';
import { UserService } from '@features/users/services/UserService';
import { ISelectItem } from '@shared/components/form-select/select.interface';
import { Observable, Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-edit-modal',
  templateUrl: './users-edit-modal.component.html',
  styleUrls: ['./users-edit-modal.component.scss']
})
export class UsersEditModalComponent implements OnInit, OnDestroy {

  private id: any;
  public user: any;

  public loading: boolean = false;
  public saving: boolean = false;
  public isAddMode: boolean = true;
  public companySearching: boolean = false;

  public form: FormGroup = new FormGroup({});

  public activeFormControl: string = 'active';
  public firstNameFormControl: string = 'first_name';
  public lastNameFormControl: string = 'last_name';
  public emailFormControl: string = 'email';
  public usernameFormControl: string = 'username';
  public passwordFormControl = 'password';
  public passwordConfirmFormControl = 'passwordConfirm';

  private _onDestroy = new Subject<void>();

  constructor(
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public data: any,
    private errorHandler: ServerErrorHandler,
    private notify: NotificationService,
    private userService: UserService,
  ) {
    this.isAddMode = !this.data.user.id;
    this.id = this.data.user.id || null;
    this.setupForm();
  }

  ngOnInit(): void {
    if (!this.isAddMode) {
      this.getDetails();
      this.passwordChanges();
    }
  }

  public getDetails(): void {
    this.loading = true;
    this.userService.getById(this.id).pipe(
      takeUntil(this._onDestroy),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (user: any) => {
        this.user = user;
        this.prepopulateForm(user);
      },
      error: (err: any) => {
        this.errorHandler.process(err);
      }
    });
  }

  private setupForm(): void {
    this.form.addControl(this.activeFormControl, new FormControl(true, []));
    this.form.addControl(this.firstNameFormControl, new FormControl('', [Validators.required]));
    this.form.addControl(this.lastNameFormControl, new FormControl('', [Validators.required]));
    this.form.addControl(this.usernameFormControl, new FormControl(null, [Validators.required]));
    this.form.addControl(this.emailFormControl, new FormControl(null, [Validators.email, Validators.required]));

    if (this.isAddMode) {
      this.form.addControl(this.passwordFormControl, new FormControl(null, [Validators.required]));
      this.form.addControl(this.passwordConfirmFormControl, new FormControl(null, [Validators.required]));
    } else {
      this.form.addControl(this.passwordFormControl, new FormControl(null, []));
      this.form.addControl(this.passwordConfirmFormControl, new FormControl(null, []));
    }
  }

  private prepopulateForm(data:any):void {
    this.getFormControl(this.usernameFormControl).setValue(data.username);
    this.getFormControl(this.firstNameFormControl).setValue(data.first_name);
    this.getFormControl(this.lastNameFormControl).setValue(data.last_name);
    this.getFormControl(this.emailFormControl).setValue(data.email);
    this.getFormControl(this.activeFormControl).setValue(data.active === 1 ? true : false);
  }

  public getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  private passwordChanges():void {
    this.form.get(this.passwordFormControl)!.valueChanges
    .pipe(
      distinctUntilChanged()
    )
    .subscribe(value => {
      if(value && value.length) {
        this.form.get(this.passwordConfirmFormControl)?.setValidators([Validators.required]);
      } else {
        this.form.get(this.passwordConfirmFormControl)?.setValidators([]);
      }
      this.form.get(this.passwordConfirmFormControl)?.updateValueAndValidity();
      this.form.get(this.passwordConfirmFormControl)?.markAsTouched();
    });

    this.form.get(this.passwordConfirmFormControl)!.valueChanges
    .pipe(
      distinctUntilChanged()
    )
    .subscribe(value => {
      if(value && value.length) {
        this.form.get(this.passwordFormControl)?.setValidators([Validators.required]);
      } else {
        this.form.get(this.passwordFormControl)?.setValidators([]);
      }
      this.form.get(this.passwordFormControl)?.updateValueAndValidity();
      this.form.get(this.passwordFormControl)?.markAsTouched();
    });
  }

  public close(refresh:boolean):void {
    this.dialogRef.close({
      refresh: refresh,
      data: null
    });
  }

  private prepare():Observable<any> {
    let data = this.form.getRawValue();
    data.active = data.active ? 1 : 0;

    if (this.isAddMode) {
      return this.userService.create(data);
    } else {
      return this.userService.update(this.id, data);
    }

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
        this.notify.success(this.isAddMode ? 'Korisnik je uspešno napravljen' : 'Korisnik je uspešno izmenjen');
        this.dialogRef.close({
          refresh: true,
          data: response
        });
      },
      error: (err: any) => {
        this.errorHandler.setError(this.form, err);
      }
    })
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
