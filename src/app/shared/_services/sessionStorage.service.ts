import { Injectable } from '@angular/core';
import { LocalUser } from '../_models/interfaces/localUser';
import { STORAGE_KEYS } from '../_config/storage_keys.config';
import { ServiceInternal } from '../_models/service-internal';

@Injectable()
export class SessionStorageService extends ServiceInternal<LocalUser> {

    getValue(): LocalUser {
        const usr = sessionStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setValue(objeto: LocalUser) {
        if (objeto == null) {
            sessionStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            sessionStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(objeto));
        }
    }

    static getSessionUser(): LocalUser {
        const usr = sessionStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    static setSessionUser(obj: LocalUser) {
        if (obj == null) {
            sessionStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            sessionStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}
