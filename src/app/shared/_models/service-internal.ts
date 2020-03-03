import { Router } from '@angular/router';

export abstract class ServiceInternal<T>{

    constructor(
        protected router: Router
    ) { };

    abstract getValue(): T;
    abstract setValue(objeto: T);
}