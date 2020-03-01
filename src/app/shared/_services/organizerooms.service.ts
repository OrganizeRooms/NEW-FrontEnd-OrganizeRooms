import { Injectable } from '@angular/core';
import { ServiceInternal } from '../_models/service-internal';

@Injectable()
export class OrganizeRoomsService<T> extends ServiceInternal<T> {

    private _value: T;

    setValue(value: T) {
        this._value = value;
    }

    getValue(): T {
        return this._value;
    }
    
}
