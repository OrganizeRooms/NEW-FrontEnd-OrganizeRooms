import { Injectable } from '@angular/core';
import { LocalUser } from '../_models/localUser';
import { STORAGE_KEYS } from '../_config/storage_keys.config';
import { ServiceInternal } from '../_models/service-internal';

@Injectable()
export class SessionStorageService extends ServiceInternal<LocalUser> {

    getValue(): LocalUser {

        const usr = sessionStorage.getItem(STORAGE_KEYS.localUser);
        return usr != null ? JSON.parse(usr) : '';
    }

    setValue(objeto: LocalUser) {
        
        if (objeto == null) {
            sessionStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            sessionStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(objeto));
        }
    }
}
