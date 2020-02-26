// ---- Inicio Métodos do Modal Participantes
/** Whether the number of selected elements matches the total number of rows. */
export function isAllSelectedPart() {
    const numSelected = this.pessoasSelecionadas.selected.length;
    const numRows = this.listPessoas.data.length;
    return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
export function masterTogglePart() {
    this.isAllSelectedPart() ?
        this.pessoasSelecionadas.clear() :
        this.listPessoas.data.forEach(rowPart => this.pessoasSelecionadas.select(rowPart));
}

/** The label for the checkbox on the passed row */
export function checkboxLabelPart(rowPart?: any): string {
    if (!rowPart) {
        return `${this.isAllSelectedPart() ? 'select' : 'deselect'} all`;
    }
    return `${this.pessoasSelecionadas.isSelected(rowPart) ? 'deselect' : 'select'} rowPart ${rowPart.position + 1}`;
}
// ---- Fim Métodos do Modal Participantes

// ---- Inicio Métodos do Modal Equipamentos
/** Whether the number of selected elements matches the total number of rows. */
export function isAllSelectedEquip() {
    const numSelected = this.equipamentosSelecionados.selected.length;
    const numRows = this.listEquipamentos.data.length;
    return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
export function masterToggleEquip() {
    this.isAllSelectedEquip() ?
        this.equipamentosSelecionados.clear() :
        this.listEquipamentos.data.forEach(rowEquip => this.equipamentosSelecionados.select(rowEquip));
}

/** The label for the checkbox on the passed row */
export function checkboxLabelEquip(rowEquip?: any): string {
    if (!rowEquip) {
        return `${this.isAllSelectedEquip() ? 'select' : 'deselect'} all`;
    }
    return `${this.equipamentosSelecionados.isSelected(rowEquip) ? 'deselect' : 'select'} rowEquip ${rowEquip.position + 1}`;
}
    // ---- Fim Métodos do Modal Equipamentos