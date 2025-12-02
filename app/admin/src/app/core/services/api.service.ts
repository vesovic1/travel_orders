import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpParams,
    HttpParamsOptions,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
    private apiUrl = '';

    constructor(private http: HttpClient) {
        this.createUrl();
    }

    private createUrl(): void {
        this.apiUrl = environment.apiUrl;
    }

    buildFormData(formData: any, data: any): void {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key] === null ? '' : data[key];
                if (data[key] instanceof Array) {
                    for (const fKey in data[key]) {
                        if (data[key].hasOwnProperty(fKey)) {
                            formData.append(key, data[key][fKey]);
                        }
                    }
                } else {
                    formData.append(key, value);
                }
            }
        }
    }

    private prepareUrl(endpoint: string, id?: number | string): string {
        return `${this.apiUrl}/${endpoint.replace(/^\/+/, '')}${
            id ? `/${id}` : ''
        }`;
    }

    public post(endpoint: string, data: any): Observable<any> {
        return this.http.post(this.prepareUrl(endpoint), data);
    }

    public postFormData(endpoint: string, data: any): Observable<any> {
        const formData: any = new FormData();
        this.buildFormData(formData, data);
        return this.http.post(this.prepareUrl(endpoint), formData);
    }

    public put(
        endpoint: string,
        id: number | string,
        data: any,
    ): Observable<any> {
        return this.http.put(this.prepareUrl(endpoint, id), data);
    }

    public putFormData(
        endpoint: string,
        id: number | string,
        data: any,
    ): Observable<any> {
        const formData: any = new FormData();
        this.buildFormData(formData, data);
        return this.http.put(this.prepareUrl(endpoint, id), formData);
    }

    public patch(
        endpoint: string,
        id: number | string,
        data: any,
    ): Observable<any> {
        return this.http.patch(this.prepareUrl(endpoint, id), data);
    }

    public getProfile(endpoint: string, me?: number | string): Observable<any> {
        return this.http.get(this.prepareUrl(endpoint, me));
    }

    public getById(endpoint: string, id?: number | string): Observable<any> {
        return this.http.get(this.prepareUrl(endpoint, id));
    }

    public delete(endpoint: string, id: number | string): Observable<any> {
        return this.http.delete(this.prepareUrl(endpoint, id));
    }

    public get(endpoint: string, parameters: any, body: any = null): Observable<any> {
        if (parameters && parameters.orderBy) {
            const order = parameters.orderBy.split(' ');
            parameters.orderBy = order[0];
            parameters.orderDir = order[1];
        } else {
            delete parameters.orderBy;
        }

        const httpParams: HttpParamsOptions = {
            fromObject: parameters,
        } as HttpParamsOptions;

        const options: object = {
            params: new HttpParams(httpParams)
        };

        return this.http.get<any>(this.prepareUrl(endpoint), options);
    }

    public getWithBody(endpoint: string, parameters: any, body: any = null): Observable<any> {
        if (parameters && parameters.orderBy) {
            const order = parameters.orderBy.split(' ');
            parameters.orderBy = order[0];
            parameters.orderDir = order[1];
        } else {
            delete parameters.orderBy;
        }

        const httpParams: HttpParamsOptions = {
            fromObject: parameters,
        } as HttpParamsOptions;

        const options: object = {
            params: new HttpParams(httpParams),
            body: body
        };

        return this.http.request<any>('POST', this.prepareUrl(endpoint), options);
    }

    public download(endpoint: string): Observable<Blob> {
        return this.http.get(this.prepareUrl(endpoint), {
            responseType: 'blob',
        });
    }

    public downloadWithBody(endpoint: string, data: any): Observable<Blob> {
        return this.http.post(this.prepareUrl(endpoint), data, {
            responseType: 'blob',
        });
    }
}
