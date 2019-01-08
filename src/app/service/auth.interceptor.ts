import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url !== 'https://restcountries.eu/rest/v2/all') {

            const authtoken = (window.sessionStorage.token) ? window.sessionStorage.token : '';
            const cloneRequest = request.clone({ headers: request.headers.set('X-Jwt-Token', authtoken) });
            return next.handle(cloneRequest);
        } else {
            return next.handle(request);
        }

    }
}
