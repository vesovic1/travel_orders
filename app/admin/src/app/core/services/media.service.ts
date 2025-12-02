import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class MediaService {

    constructor(
        private api: ApiService
    ) {}

    upload(folder: string, file: any): Observable<any> {
        return this.api.postFormData(`/media/${folder}/upload`, {file: file});
    }
}