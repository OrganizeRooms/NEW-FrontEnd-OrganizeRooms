export abstract class ServiceInternal<T>{

    abstract getValue(): T;
    abstract setValue(objeto: T): void;
}