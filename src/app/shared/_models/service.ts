import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '.';

@Injectable({ providedIn: 'root' })
export abstract class Service<T> {

    constructor(protected http: HttpClient) { }

    abstract buscarTodos(): Observable<Response>;

    abstract adicionar(objeto: T): Observable<Response>;

    abstract atualizar(objeto: T): Observable<Response>;

    abstract deletar(id: String): Observable<Response>;

}