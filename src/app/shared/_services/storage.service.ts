import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../_config/storage_keys.config';
import { ServiceInternal } from '../_models/';

@Injectable()
export class StorageService<T> extends ServiceInternal<T> {

    getValue(): T {
        const usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setValue(obj: T) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}
