import { Injectable } from '@angular/core';
import { MapApiService } from './api/map-api.service';
import { ReactiveState } from '../utils/reactive-state/reactive-state';
import { MapDetailResponse, MapResponse } from '../utils/types/map';

@Injectable({
    providedIn: 'root',
})
export class MapService {
    map: ReactiveState<MapResponse>;
    mapDetail: ReactiveState<MapDetailResponse>;

    constructor(private _mapApiService: MapApiService) {
        this.map = ReactiveState.create(this._mapApiService.getMapIds);
        this.mapDetail = ReactiveState.create(this._mapApiService.getMapDetail);
    }
}
