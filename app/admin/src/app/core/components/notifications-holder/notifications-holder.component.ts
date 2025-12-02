import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '@features/notify/service/notify.service';
import { Notification, NotificationType } from '@features/notify/interfaces/notify.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications-holder',
  templateUrl: './notifications-holder.component.html',
  styleUrls: ['./notifications-holder.component.scss']
})
export class NotificationsHolderComponent implements OnInit, OnDestroy {

  public notificationsTr: Notification[] = [];
  public notificationsTc: Notification[] = [];
  public notificationsTl: Notification[] = [];

  public notificationsBl: Notification[] = [];
  public notificationsBc: Notification[] = [];
  public notificationsBr: Notification[] = [];

  private _subscription!: Subscription;

  constructor(private _notificationSvc: NotificationService) { }

  ngOnInit() {
    this._subscription = this._notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));
  }

  private _addNotification(notification: Notification) {
    switch(notification.direction) {
      case 'top-left':
        this.notificationsTl.push(notification);
        break;
      case 'top-center':
        this.notificationsTc.push(notification);
        break;
      case 'top-right':
        this.notificationsTr.push(notification);
        break;
      case 'bottom-left':
        this.notificationsBl.push(notification);
        break;
      case 'bottom-center':
        this.notificationsBc.push(notification);
        break;
      case 'bottom-right':
        this.notificationsBr.push(notification);
        break;
      default:
        this.notificationsTr.push(notification);
        break;
    }

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }

  close(notification: Notification) {
    switch(notification.direction) {
      case 'top-left':
        this.notificationsTl = this.notificationsTl.filter(notif => notif.id !== notification.id);
        break;
      case 'top-center':
        this.notificationsTc = this.notificationsTc.filter(notif => notif.id !== notification.id);
        break;
      case 'top-right':
        this.notificationsTr = this.notificationsTr.filter(notif => notif.id !== notification.id);
        break;
      case 'bottom-left':
        this.notificationsBl = this.notificationsBl.filter(notif => notif.id !== notification.id);
        break;
      case 'bottom-center':
        this.notificationsBc = this.notificationsBc.filter(notif => notif.id !== notification.id);
        break;
      case 'bottom-right':
        this.notificationsBr = this.notificationsBr.filter(notif => notif.id !== notification.id);
        break;
      default:
        this.notificationsTr = this.notificationsTr.filter(notif => notif.id !== notification.id);
        break;
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  className(notification: Notification): string {

    let style: string;

    switch (notification.type) {
      case NotificationType.success:
        style = 'success';
        break;
      case NotificationType.warning:
        style = 'warning';
        break;
      case NotificationType.error:
        style = 'error';
        break;
      default:
        style = 'info';
        break;
    }

    return style;
  }
}