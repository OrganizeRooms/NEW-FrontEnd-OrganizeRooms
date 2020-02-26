import { Injectable } from '@angular/core';

@Injectable()
export class OrganizeRoomsService<T> {

    private _value: T;

    constructor() { }

    setValue(value: T) {
        this._value = value;
    }

    getValue(): T {
        return this._value;
    }

}
