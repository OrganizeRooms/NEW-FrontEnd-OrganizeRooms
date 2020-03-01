import { Injectable } from '@angular/core';

@Injectable()
export class OrganizeRoomsService {

    private _value: any;

    constructor() { }

    setValue(value: any) {
        this._value = value;
    }

    getValue(): any {
        return this._value;
    }

}
