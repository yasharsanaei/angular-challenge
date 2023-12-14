import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export abstract class ApiService {

    abstract entity: string;

    protected constructor(protected http: HttpClient) {
    }

    /** Gets the url and add the entity to the start of the url */
    protected url(url: string): string {
        return url.startsWith('/') ? this.entity.concat(url) : this.entity.concat('/').concat(url);
    }

}
