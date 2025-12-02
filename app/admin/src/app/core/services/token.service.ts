import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import jwtDecode from 'jwt-decode';
import { DateTime } from 'luxon';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private currentToken: string | null = null;

    constructor(private storage: StorageService) {
        const accessToken = this.loadAccessToken();
        if (accessToken && !this.expired()) {
            this.currentToken = accessToken;
            // console.log('set current token');
        } else {
            // console.log('token not set or expired');
        }
    }

    public parse(token: string) {
        return jwtDecode(token);
    }

    public set(accessToken: string): void {
        this.currentToken = accessToken;

        const accessTokenData: any = this.parse(accessToken);

        const expires = DateTime.now().toMillis() + accessTokenData.exp * 1000;
        this.storage.setSecureItem('access_token', accessToken);
        this.storage.setItem('access_token_expires', JSON.stringify(expires));
    }

    public getAccessToken(): string | null {
        return this.currentToken;
    }

    public loadAccessToken(): string {
        const token = this.storage.getSecureItem('access_token');
        return token ? token : '';
    }

    public remove(): void {
        this.storage.removeItem('access_token');
        this.storage.removeItem('access_token_expires');
        this.currentToken = null;
    }

    public expired(): boolean {
        const expiration: any = this.getExpiration();
        return expiration ? DateTime.now() >= expiration : true;
    }

    private getExpiration() {
        const expiration = this.storage.getItem('access_token_expires');
        if (expiration) {
            return DateTime.fromMillis(JSON.parse(expiration));
        }
        return false;
    }
}
