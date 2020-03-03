import { SalaService } from '../_services';
import { Sala } from '../_models';

export class SalaController {

    constructor(private salaService: SalaService) { }

    async buscarTodos(): Promise<Sala[]> {
        return;
    }
}