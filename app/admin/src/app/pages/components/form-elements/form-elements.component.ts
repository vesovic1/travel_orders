import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRadioItem } from '@shared/components/form-radio/radio.interface';
import { ISelectItem } from '@shared/components/form-select/select.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss']
})
export class FormElementsComponent implements OnInit, OnDestroy {

  public checkboxFormControlName: string = 'checkbox';
  public checkboxCheckedFormControlName: string = 'checkboxChecked';
  public checkboxDisabledFormControlName: string = 'checkboxDisabled';

  public genderFormControlName: string = 'gender';
  public gender2FormControlName: string = 'gender2';
  public gender3FormControlName: string = 'gender3';

  public firstNameFormControlName: string = 'firstName';
  public lastNameFormControlName: string = 'lastName';
  public emailFormControlName: string = 'email';
  public disabledInputFormControlName: string = 'disabledInput';
  public descriptionFormControlName: string = 'description';
  public descriptionDisabledFormControlName: string = 'descriptionDisabled';

  public ageFormControlName: string = 'age';
  public numberMinMaxFormControlName: string = 'numberMinMax';

  public languageFormControlName: string = 'language';
  public languageDisabledFormControlName: string = 'languageDisabled';
  public languageRequiredFormControlName: string = 'languageRequired';
  public languageSearchableFormControlName: string = 'languageSearchable';
  public languagePreselectedFormControlName: string = 'languagePreselected';
  public languageMultiselectFormControlName: string = 'languageMultiselect';
  public deviceFormControlName: string = 'device';
  public multiDeviceFormControlName: string = 'multiDevice';
  public preselectedMultiDeviceFormControlName: string = 'preselectedMultiDevice';
  public devicePreselectedFormControlName: string = 'devicePreselected';

  public dateOfBirthFormControlName: string = 'dateOfBirth';
  public datetimeOfBirthFormControlName: string = 'datetimeOfBirth';
  public dateDisabledFormControlName: string = 'dateDisabled';
  public dateRequiredFormControlName: string = 'dateRequired';

  public passwordFormControlName: string = 'password';
  public passwordStandardFormControlName: string = 'passwordStandard';

  public colorFormControlName: string = 'color';
  public colorPreselectedFormControlName: string = 'colorPreselected';
  public colorDisabledFormControlName: string = 'colorDisabled';
  public colorRequiredFormControlName: string = 'colorRequired';

  public form: FormGroup = new FormGroup({});
  private _onDestroy = new Subject<void>();

  public genderOptions: IRadioItem[] = [];
  public languageOptions: ISelectItem[] = [];
  public carsOptions: ISelectItem[] = [];
  public deviceOptions: ISelectItem[] = [];
  public devicePreselectedOptions: ISelectItem[] = [];
  public multiDeviceOptions: ISelectItem[] = [];
  public preselectedMultiDeviceOptions: ISelectItem[] = [];
  public deviceSearching: boolean = false;

  constructor(
  ) {
    this.genderOptions = [
      { value: 1, text: 'Male' },
      { value: 2, text: 'Female' },
      { value: 3, text: 'Undefined' }
    ];

    this.languageOptions = [
      { value: 1, text: 'Serbian' },
      { value: 2, text: 'English' },
      { value: 3, text: 'Germany' },
      { value: 4, text: 'French' }
    ];

    this.carsOptions = [
      { value: 1, text: 'Audi' },
      { value: 2, text: 'Alfa Romeo' },
      { value: 3, text: 'Aston Martin' },
      { value: 4, text: 'BMW' },
      { value: 5, text: 'Bentley' },
      { value: 6, text: 'Bugatti' },
      { value: 7, text: 'Citroen' },
      { value: 8, text: 'Cupra' },
      { value: 9, text: 'Cadillac' },
      { value: 10, text: 'DeLorean' },
      { value: 11, text: 'Dacia' },
      { value: 12, text: 'Ford' },
      { value: 13, text: 'Fiat' },
      { value: 14, text: 'Ferrari' },
      { value: 15, text: 'Honda' },
      { value: 16, text: 'Isuzu' }
    ];

  }

  ngOnInit(): void {
    this.setupForm();
  }


  private setupForm():void {
    this.form.addControl(this.checkboxFormControlName, new FormControl(false, []));
    this.form.addControl(this.checkboxCheckedFormControlName, new FormControl(true, []));
    this.form.addControl(this.checkboxDisabledFormControlName, new FormControl({value: true, disabled: true}, []));

    this.form.addControl(this.genderFormControlName, new FormControl(this.genderOptions[0].value, []));
    this.form.addControl(this.gender2FormControlName, new FormControl(this.genderOptions[0].value, []));
    this.form.addControl(this.gender3FormControlName, new FormControl({ value: this.genderOptions[0].value, disabled: true }, []));

    this.form.addControl(this.firstNameFormControlName, new FormControl('', [Validators.required]));
    this.form.addControl(this.lastNameFormControlName, new FormControl('', []));

    this.form.addControl(this.emailFormControlName, new FormControl('', [Validators.required, Validators.email]));
    this.form.addControl(this.disabledInputFormControlName, new FormControl({value: '', disabled: true}, []));

    this.form.addControl(this.ageFormControlName, new FormControl('', [Validators.min(1), Validators.max(100)]));
    this.form.addControl(this.numberMinMaxFormControlName, new FormControl('', [Validators.min(1), Validators.max(100)]));

    this.form.addControl(this.descriptionFormControlName, new FormControl('', [Validators.required]));
    this.form.addControl(this.descriptionDisabledFormControlName, new FormControl({value: '', disabled: true}, []));

    this.form.addControl(this.deviceFormControlName, new FormControl(null, []));
    this.form.addControl(this.multiDeviceFormControlName, new FormControl([], []));
    this.form.addControl(this.preselectedMultiDeviceFormControlName, new FormControl([10, 11, 12], []));
    this.form.addControl(this.devicePreselectedFormControlName, new FormControl(18, []));
    this.form.addControl(this.languageFormControlName, new FormControl(null, []));
    this.form.addControl(this.languageDisabledFormControlName, new FormControl({value: null, disabled: true}, []));
    this.form.addControl(this.languageRequiredFormControlName, new FormControl(null, [Validators.required]));
    this.form.addControl(this.languageSearchableFormControlName, new FormControl(null, []));
    this.form.addControl(this.languagePreselectedFormControlName, new FormControl(1, []));
    this.form.addControl(this.languageMultiselectFormControlName, new FormControl([1,3,8], [Validators.required]));

    this.form.addControl(this.dateOfBirthFormControlName, new FormControl(null, []));
    this.form.addControl(this.datetimeOfBirthFormControlName, new FormControl(null, []));
    this.form.addControl(this.dateDisabledFormControlName, new FormControl({value: null, disabled: true}, []));
    this.form.addControl(this.dateRequiredFormControlName, new FormControl(null, [Validators.required]));
    this.form.addControl(this.passwordFormControlName, new FormControl('', []));
    this.form.addControl(this.passwordStandardFormControlName, new FormControl('', []));

    this.form.addControl(this.colorFormControlName, new FormControl('', []));
    this.form.addControl(this.colorPreselectedFormControlName, new FormControl('#ababab', []));
    this.form.addControl(this.colorDisabledFormControlName, new FormControl({value: '', disabled: true}, []));
    this.form.addControl(this.colorRequiredFormControlName, new FormControl('', [Validators.required]));
  }

  test():void {
  }

  public getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  public save():void {
    const formData = this.form.getRawValue();

  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
