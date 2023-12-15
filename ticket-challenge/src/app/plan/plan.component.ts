import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { MapService } from '../services/map.service';
import { ReactiveState } from '../utils/reactive-state/reactive-state';
import { MapDetailResponse } from '../utils/types/map';

@Component({
    selector: 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit, OnDestroy {
    #onDestroy$: Subject<void> = new Subject<void>();
    #mapId?: string;
    mapDetail: ReactiveState<MapDetailResponse>;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _mapService: MapService,
    ) {
        this.mapDetail = this._mapService.mapDetail;
    }

    ngOnInit(): void {
        this._activatedRoute.params
            .pipe(
                takeUntil(this.#onDestroy$),
                map((params) => params['map_id']),
            )
            .subscribe((mapId) => {
                this.#mapId = mapId;
                if (this.#mapId) this.mapDetail.update(this.#mapId);
                else this._router.navigate(['']);
            });
        // You should get the plan array from the: base-url/map/<map_id>
    }

    ngOnDestroy(): void {
        this.#onDestroy$.next();
        this.#onDestroy$.complete();
    }
}
