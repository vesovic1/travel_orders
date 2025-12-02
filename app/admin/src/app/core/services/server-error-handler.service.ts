import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '@features/notify/service/notify.service';

@Injectable({
    providedIn: 'root',
})
export class ServerErrorHandler {

    constructor(
        private _notify: NotificationService
    ) {}

    public process(error: any, direction: string = 'bottom-right') {

        if (!error.error && !error.validationErrors) {
            this._notify.error(error, direction);
            return;
        }

        if ('error' in error) {
            const _error = Array.isArray(error.error) ? error.error : [error.error];
            this._notify.error(_error.join(', '), direction);
        }

        if ('validationErrors' in error) {
            this.processValidationErrors(error, direction);
        }


    }

    private processValidationErrors(error:any, direction:string): void {
        Object.keys(error.validationErrors).forEach(key => {

            let errorMessages:string[] = [];

            Object.keys(error.validationErrors[key]).forEach(mKey => {
                errorMessages.push(error.validationErrors[key][mKey]);
            });

            this._notify.error(errorMessages.join(', '), direction);
        });
    }

    public setError(form: FormGroup, errors: any):void {
        if (errors.validationErrors) {
            Object.keys(errors.validationErrors).forEach(key => {

                let errorMessages:string[] = [];

                Object.keys(errors.validationErrors[key]).forEach(mKey => {
                    errorMessages.push(errors.validationErrors[key][mKey]);
                });

                form.controls[key].setErrors({serverError: errorMessages});
                form.controls[key].markAsTouched();
            });
        }

        if (errors.error) {
            this._notify.error(errors.error);
        }
    }
}