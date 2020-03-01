import { Injectable } from '@angular/core';
import { Service } from './service';

@Injectable({ providedIn: 'root' })
export abstract class ServiceInternal<T> extends Service{

    abstract getValue(): T;
    abstract setValue(objeto: T);
}