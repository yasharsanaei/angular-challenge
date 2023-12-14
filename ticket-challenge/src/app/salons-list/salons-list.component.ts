import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { ReactiveState } from '../utils/reactive-state/reactive-state';
import { MapResponse } from '../utils/types/map';

@Component({
    selector: 'app-salons-list',
    templateUrl: './salons-list.component.html',
    styleUrls: ['./salons-list.component.scss'],
})
export class SalonsListComponent implements OnInit {
    map: ReactiveState<MapResponse>;

    constructor(private _mapService: MapService) {
        this.map = this._mapService.map;
    }

    ngOnInit(): void {
        this.map.update();
    }
}
