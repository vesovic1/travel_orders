import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-google-button',
    templateUrl: './google-button.component.html',
    styleUrls: ['./google-button.component.scss'],
})
export class GoogleButtonComponent {
    constructor(private authService: AuthService) {}

    signInWithGoogle() {
        this.authService.signinGoogle();
    }
}
