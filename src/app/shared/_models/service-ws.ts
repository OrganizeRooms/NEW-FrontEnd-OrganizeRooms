import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Service } from './service';
import { Response } from './interfaces/response';

@Injectable({ providedIn: 'root' })
export abstract class ServiceWS<T> extends Service {

    abstract buscarTodos(): Observable<Response>;
    abstract adicionar(objeto: T): Observable<Response>;
    abstract atualizar(objeto: T): Observable<Response>;
    abstract deletar(id: string): Observable<Response>;
}