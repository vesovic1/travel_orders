import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((res) => this.errorHandler(res)));
  }

  private errorHandler(response: any): Observable<any> {

    const status = response?.status;
    if (status === 401 || status === 403) {
      this.router.navigate(['/auth/signin']);
      // this.authService.logout();
    }

    return throwError(() => response.error);
  }
}