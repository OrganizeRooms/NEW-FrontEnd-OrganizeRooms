import { Injectable } from '@angular/core';
import { LocalUser } from '../_models/localUser';
import { STORAGE_KEYS } from '../_config/storage_keys.config';

@Injectable()
export class SessionStorageService {

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
