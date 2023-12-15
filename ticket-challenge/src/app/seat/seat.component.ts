import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-seat',
    templateUrl: './seat.component.html',
    styleUrls: ['./seat.component.scss'],
})
export class SeatComponent {
    @Input()
    size: string = '2';

    @Input()
    set isNotAvailable(value: unknown) {
        this.notAvailable = Boolean(value);
    }

    notAvailable: boolean = false;
}
