import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService, SessionStorageService } from '../_services';
import { API_CONFIG } from '../_config';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private sessionStorageService: SessionStorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //const localUser = this.storage.getLocalUser();
        const localUser = this.sessionStorageService.getValue();

        const N = API_CONFIG.baseUrl.length;
        const requestToAPI = req.url.substring(0, N) === API_CONFIG.baseUrl;

        if (localUser && requestToAPI) {
            const headers = req.headers
                .set('Content-Type', 'application/text')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + localUser.token);


            const cloneReq = req.clone({ headers });

            return next.handle(cloneReq);
        } else {
            return next.handle(req);
        }
    }
}