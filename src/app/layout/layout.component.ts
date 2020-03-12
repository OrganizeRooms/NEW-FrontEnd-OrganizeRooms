import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;

    constructor() { }

    ngOnInit() {
    }

    receiveCollapsed($event: boolean) {
        this.collapedSideBar = $event;
    }
}
