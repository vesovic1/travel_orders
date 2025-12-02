import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AES, enc } from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    prepareKey(key: string): string {
        return `${environment.storagePrefix}${key}`;
    }

    getItem(key: string): any {
        const value = localStorage.getItem(this.prepareKey(key));
        return typeof value === 'string' ? JSON.parse(value) : value;
    }

    setItem(key: string, data: any): void {
        localStorage.setItem(this.prepareKey(key), JSON.stringify(data));
    }

    setSecureItem(key: string, data: any): void {
        data = AES.encrypt(JSON.stringify(data), environment.storageSecureKey);
        localStorage.setItem(this.prepareKey(key), data.toString());
    }

    getSecureItem(key: string): any {
        const value = localStorage.getItem(this.prepareKey(key));
        if (value !== null) {
            const data = AES.decrypt(
                value,
                environment.storageSecureKey,
            ).toString(enc.Utf8);
            return typeof value === 'string' ? JSON.parse(data) : data;
        }
        return null;
    }

    removeItem(key: string): void {
        localStorage.removeItem(this.prepareKey(key));
    }

    clear(): void {
        localStorage.clear();
    }
}
