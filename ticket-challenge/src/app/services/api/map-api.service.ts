import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { delay, Observable } from 'rxjs';
import {
    MapDetailResponse,
    MapResponse,
    MapTicketBody,
    MapTicketResponse,
} from '../../utils/types/map';

@Injectable({
    providedIn: 'root',
})
export class MapApiService extends ApiService {
    entity: string = 'map';

    //TODO: GET /map -> ['m213', 'm654', 'm63', 'm6888']
    getMapIds() {
        // this.http.get(this.url(''))
        return new Observable<MapResponse>((observer) => {
            observer.next(['m213', 'm654', 'm63', 'm6888'] as MapResponse);
            observer.complete();
        }).pipe(delay(1000));
    }

    //TODO: GET /map/<map_id> -> [ [0 0 1 0] [0 1 0 0] [1 1 1 1] [1 1 1 1] ]
    getMapDetail(id: string) {
        // this.http.get(this.url(id))
        return new Observable<MapDetailResponse>((observer) => {
            observer.next([
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
            ] as MapDetailResponse);
            observer.complete();
        }).pipe(delay(1000));
    }

    //TODO: POST /map/<map_id>/ticket body: { x: 2, y: 1 }
    postTicket(id: string, body: MapTicketBody) {
        // this.http.post(this.url(`${id}/ticket`), body)
        return new Observable<MapTicketResponse>((observer) => {
            if (!body.x || !body.y)
                observer.error({ message: 'X and Y must be provided' });
            else observer.next({ message: 'Success' });
            observer.complete();
        }).pipe(delay(1000));
    }
}
