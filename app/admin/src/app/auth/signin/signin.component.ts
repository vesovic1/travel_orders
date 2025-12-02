import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@features/notify/service/notify.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
    public signinForm: FormGroup = new FormGroup({});
    public loading = false;
    public error: string[] = [];

    private backUrl: string = '/';

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private _notify: NotificationService,
    ) {}

    ngOnInit(): void {
        this.signinForm.addControl(
            'username',
            new FormControl('', [Validators.required]),
        );
        this.signinForm.addControl(
            'password',
            new FormControl('', [Validators.required]),
        );
        this.route.queryParams.subscribe((params: any) => {
            if (params.backUrl && params.backUrl.length) {
                this.backUrl = params.backUrl;
            }
        });
    }

    signin() {
        this.loading = true;
        const form = this.signinForm.getRawValue();

        this.authService.login(form.username, form.password).subscribe({
            next: (response: any) => {
                this.router.navigate([this.backUrl]);
                this.loading = false;
                this.error = [];
            },
            error: (e: any) => {
                this.loading = false;
                this.error = Array.isArray(e.message) ? e.message : [e.message];
                this._notify.error(this.error.toString(), 'bottom-center');
            },
        });
    }

    public getFormControl(name: string): FormControl {
        return this.signinForm.get(name) as FormControl;
    }
}
