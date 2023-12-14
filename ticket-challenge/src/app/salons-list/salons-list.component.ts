import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MapService } from '../services/map.service';
import { ReactiveState } from '../utils/reactive-state/reactive-state';
import { MapResponse } from '../utils/types/map';

@Component({
    selector: 'app-salons-list',
    templateUrl: './salons-list.component.html',
    styleUrls: ['./salons-list.component.scss'],
})
export class SalonsListComponent implements OnInit, OnDestroy {
    #onDestroy$: Subject<void> = new Subject<void>();
    map: ReactiveState<MapResponse>;

    constructor(private _mapService: MapService) {
        this.map = this._mapService.map;
    }

    ngOnInit(): void {
        this.map.data$.pipe(takeUntil(this.#onDestroy$)).subscribe({
            next: (value) => {
                if (!value) this.map.update();
            },
        });
    }

    ngOnDestroy(): void {
        this.#onDestroy$.next();
        this.#onDestroy$.complete();
    }
}
