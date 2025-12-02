import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '@core/services/token.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const accessToken = this.tokenService.getAccessToken();

        if (accessToken) {
            const cloned = request.clone({
                headers: request.headers.append(
                    'Authorization',
                    `Bearer ${accessToken}`,
                ),
            });

            return next.handle(cloned);
        }

        return next.handle(request);
    }
}
