import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class TestService {

    public fetchTableData(params: any):Observable<any> {
        return of({
            rows: [
                { id: 1, firstName: 'Johnathan', lastName: 'Velasquez', email: 'smallpaul@att.net', phone: '(360) 795-3706' },
                { id: 2, firstName: 'Mariyah', lastName: 'Jones', email: 'earmstro@optonline.net', phone: '(923) 976-1562' },
                { id: 3, firstName: 'Miriam', lastName: 'Benson', email: 'kobayasi@msn.com', phone: '(881) 728-8773' },
                { id: 4, firstName: 'Lila', lastName: 'Irwin', email: 'microfab@live.com', phone: '(782) 296-2980' },
                { id: 5, firstName: 'Ricardo', lastName: 'Costa', email: 'chronos@gmail.com', phone: '(838) 326-4636' },
                { id: 6, firstName: 'Finley', lastName: 'Hess', email: 'farber@aol.com', phone: '(977) 847-7926' },
                { id: 7, firstName: 'Isaac', lastName: 'Moreno', email: 'pkilab@optonline.net', phone: '(428) 317-2170' },
                { id: 8, firstName: 'Lyla', lastName: 'Mcconnell', email: 'arachne@yahoo.com', phone: '(712) 637-2380' },
                { id: 9, firstName: 'Lucy', lastName: 'Matthews', email: 'openldap@optonline.net', phone: '(715) 851-8394' },
                { id: 10, firstName: 'Karson', lastName: 'Bradford', email: 'chaikin@att.net', phone: '(266) 917-3930' }
            ],
            _meta: {
                total: 10
            }
        });
    }

}