import { Observable, throwError } from 'rxjs';
import { Response } from './response';

export interface ServiceWS<T> {

    buscarTodos(): Observable<Response>;
    adicionar(objeto: T): Observable<Response>;
    atualizar(objeto: T): Observable<Response>;
    deletar(id: number): Observable<Response>;

}