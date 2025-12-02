import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { Notification, NotificationType } from '../interfaces/notify.interface';

@Injectable()
export class NotificationService {

    private _subject = new Subject<Notification>();
    private _idx = 0;

    constructor() { }

    getObservable(): Observable<Notification> {
        return this._subject.asObservable();
    }

    info(message: string, direction = 'bottom-right', timeout = 3000) {
        this._subject.next(new Notification(this._idx++, NotificationType.info, '', message, timeout, direction));
    }

    success(message: string, direction = 'bottom-right', timeout = 3000) {
        this._subject.next(new Notification(this._idx++, NotificationType.success, '', message, timeout, direction));
    }

    warning(message: string, direction = 'bottom-right', timeout = 3000) {
        this._subject.next(new Notification(this._idx++, NotificationType.warning, '', message, timeout, direction));
    }

    error(message: string, direction = 'bottom-right', timeout = 3000) {
        this._subject.next(new Notification(this._idx++, NotificationType.error, '', message, timeout, direction));
    }
}