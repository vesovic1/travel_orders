import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    userData$: Observable<any> = this.userDataSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private tokenService: TokenService
    ) {
        //TODO: Fix: timeout implemented to lazy load service, and avoid circular dependency injection in signup-profile component
        setTimeout(() => {
            const accessToken = this.tokenService.getAccessToken();
            if (accessToken) {
                this.authenticateUser();
            }
        });
    }

    public isLoggedIn(): boolean {
        return !this.tokenService.expired();
    }

    public isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    private authenticateUser() {
        this.apiService.get('/profile', {}).pipe(
            map((userData: any) => {
                return userData;
            }),
        ).subscribe({
            next: (data: any) => {
                this.userDataSubject.next(data);
            },
        });
    }

    public login(username: string, password: string) {
        return this.apiService.post('/auth/login', { username, password }).pipe(
            map((data: any) => {
                this.setToken(data);
                return data;
            }),
        );
    }

    public setToken(data: any) {
        this.tokenService.set(data.access_token);
        this.authenticateUser();
    }

    public logout(): void {
        this.tokenService.remove();
        this.userDataSubject.next(null);
        // window.location.reload();
    }

    public signinGoogle() {
        // const callbackUrl = `${location.protocol}//${location.host}/auth/google`;
        // window.location.href = `${
        //     environment.apiUrl
        // }/auth/google?callback=${encodeURI(callbackUrl)}`;
        window.location.href = `${environment.apiUrl}/auth/google`;
    }
}
