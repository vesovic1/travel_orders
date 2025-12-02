import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class UserService {

    private userNameSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    userName$: Observable<any> = this.userNameSubject.asObservable();

    constructor(private apiService: ApiService) {}

    public get(params: any): Observable<any> {
        return this.apiService.get(`/users`, params);
    }

    public getById(id: any): Observable<any> {
        return this.apiService.getById(`/users`, id);
    }

    public create(data: any): Observable<any> {
        return this.apiService.post(`/users`, data);
    }

    public update(id: any, data: any): Observable<any> {
        return this.apiService.patch(`/users`, id, data);
    }

    public delete(id: any): Observable<any> {
        return this.apiService.delete(`/users`, id);
    }

    public getPermissions(username: any): Observable<any> {
        return this.apiService.get(`/users/${username}/permissions`, {});
    }

    public updatePermissions(username: any, data: any): Observable<any> {
        return this.apiService.patch(`/users/${username}`, 'permissions', data);
    }

    public setUserName(name:string) {
        this.userNameSubject.next(name);
    }
}