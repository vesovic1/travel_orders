import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-forbidden-access-modal',
  templateUrl: './forbidden-access-modal.component.html',
  styleUrls: ['./forbidden-access-modal.component.scss']
})
export class ForbiddenAccessModalComponent {

  constructor(
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public data: any,
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

}
