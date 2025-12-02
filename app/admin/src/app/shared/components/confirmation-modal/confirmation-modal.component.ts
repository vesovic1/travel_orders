import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  public closeButton:string;
  public confirmButton:string;
  public theme:string;

  public hasCheckbox: boolean = false;
  public checkboxLabel: string = '';
  public checkboxFormControl: string = 'checked';
  private checkboxForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public data: any
  ) {
    this.hasCheckbox = this.data.hasOwnProperty('checkbox') && this.data.checkbox;
    this.checkboxLabel = this.data.hasOwnProperty('checkboxLabel') ? this.data.checkboxLabel : '';
    this.closeButton = this.data.hasOwnProperty('closeLabel') ? this.data.closeLabel : 'No';
    this.confirmButton = this.data.hasOwnProperty('confirmLabel') ? this.data.confirmLabel : 'Yes';
    this.theme = this.data.hasOwnProperty('theme') ? this.data.theme : '';
  }

  ngOnInit(): void {
    this.checkboxForm.addControl(this.checkboxFormControl, new FormControl(false, []));
  }

  public getFormControl(name: string): FormControl {
    return this.checkboxForm.get(name) as FormControl;
  }

  save():void {
    if (this.hasCheckbox) {
      const formData: any = this.checkboxForm.getRawValue();
      this.dialogRef.close({response: true, checkboxResult: formData.checked});
    } else {
      this.dialogRef.close(true);
    }
  }

  close():void {
    if (this.hasCheckbox) {
      this.dialogRef.close({response: false});
    } else {
      this.dialogRef.close(false);
    }
  }
}
