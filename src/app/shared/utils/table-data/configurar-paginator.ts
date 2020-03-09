import { MatPaginator } from '@angular/material';
import { rangeLabel } from './range-label';

export function configurarPaginador(paginator: MatPaginator): MatPaginator {

    paginator._intl.itemsPerPageLabel = 'Itens por Página';
    paginator._intl.getRangeLabel = rangeLabel;
    paginator.showFirstLastButtons = true;
    paginator.pageSizeOptions = [8, 10, 15, 20, 30];

    return paginator;
}