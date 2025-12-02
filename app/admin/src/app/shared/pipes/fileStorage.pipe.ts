import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({
    name: 'fileStorage',
})
export class FileStoragePipe implements PipeTransform {
    transform(value: any):any {
        return `${environment.apiUrl}${value}?${performance.now()}`;
    }
}