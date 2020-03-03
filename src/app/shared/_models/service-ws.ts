import { Observable } from 'rxjs';
import { Response } from './response';
import { HttpClient } from '@angular/common/http';

export abstract class ServiceWS<T> {

    constructor(
        protected http: HttpClient
    ) { };

    abstract buscarTodos(): Observable<Response>;
    abstract adicionar(objeto: T): Observable<Response>;
    abstract atualizar(objeto: T): Observable<Response>;
    abstract deletar(id: string): Observable<Response>;
}