import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '@features/notify/service/notify.service';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { Subject, takeUntil } from 'rxjs';
import { TestModalComponent } from './test-modal/test-modal.component';

@Component({
  selector: 'app-cdk-elements',
  templateUrl: './cdk-elements.component.html',
  styleUrls: ['./cdk-elements.component.scss']
})
export class CdkElementsComponent implements OnInit, OnDestroy {
  
  private _onDestroy = new Subject<void>();

  constructor(
    private dialog: Dialog,
    private _notify: NotificationService
  ) {

  }

  ngOnInit(): void {
  }
  
  public openModal():void {
    this.dialog.open(TestModalComponent, {
      data: {
        message: 'Hello World'
      },
      maxWidth: '50%',
      disableClose: true
    });
  }

  public openConfirmationModal():void {

    const confirmationModal = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Do you like dogs?',
        content: 'Please tell us if you like dogs.'
      },
      disableClose: true
    });

    confirmationModal.closed
    .pipe(
      takeUntil(this._onDestroy)
    )
    .subscribe((result) => {
      if (result) {
        console.log('YES');
      } else {
        console.log('NO')
      }
    });
  }

  public openConfirmationRmoveModal():void {

    const confirmationModal = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Are you sure?',
        content: 'Are you sure you want to delete the user <b>Milan Vesović<b>?',
        theme: 'danger',
        closeLabel: 'Cancel',
        confirmLabel: 'Delete'
      },
      disableClose: true
    });

    confirmationModal.closed
    .pipe(
      takeUntil(this._onDestroy)
    )
    .subscribe((result) => {
      if (result) {
        console.log('YES');
      } else {
        console.log('NO')
      }
    });
  }

  public openConfirmationSuccessModal():void {

    const confirmationModal = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo, mauris non ullamcorper tempus, metus mauris convallis ante, a volutpat urna leo id nibh.',
        theme: 'success',
        closeLabel: 'Cancel',
        confirmLabel: 'Success'
      },
      disableClose: true
    });

    confirmationModal.closed
    .pipe(
      takeUntil(this._onDestroy)
    )
    .subscribe((result) => {
      if (result) {
        console.log('YES');
      } else {
        console.log('NO')
      }
    });
  }

  public notification(type:string):void {
    switch(type) {
      case 'info':
        this._notify.info('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus neque blandit risus posuere dignissim.');
        break;
      case 'success':
        this._notify.success('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus neque blandit risus posuere dignissim.');
        break;
      case 'warn':
        this._notify.warning('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus neque blandit risus posuere dignissim.');
        break;
      case 'error':
        this._notify.error('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus neque blandit risus posuere dignissim.');
        break;
    }
  }

  public notificationDirection(direction:string):void {
    this._notify.success('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus neque blandit risus posuere dignissim.', direction);
  }

  ngOnDestroy(): void {
      this._onDestroy.next();
      this._onDestroy.complete();
  }
}
