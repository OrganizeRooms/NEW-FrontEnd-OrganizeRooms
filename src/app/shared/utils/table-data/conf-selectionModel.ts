import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

export class ConfSelectionModel<T> {

    constructor(
        private selectionModel: SelectionModel<T>,
        private tableData: MatTableDataSource<T>
    ) { }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): boolean {
        const numSelected = this.selectionModel.selected.length;
        const numRows = this.tableData.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): void {
        this.isAllSelected() ?
            this.selectionModel.clear() :
            this.tableData.data.forEach(row => this.selectionModel.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selectionModel.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
}