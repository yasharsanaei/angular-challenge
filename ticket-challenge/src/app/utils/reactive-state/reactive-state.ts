import {
    BehaviorSubject,
    combineLatest,
    isObservable,
    map,
    Observable,
} from 'rxjs';
import { isPromise } from 'rxjs/internal/util/isPromise';

export type FetcherFunction<T, D = any> = (
    params?: D,
) => Observable<T> | Promise<T> | T;

export class ReactiveState<T> {
    get data$(): Observable<T | undefined> {
        return this.#data$.asObservable();
    }

    get isFetching$(): Observable<boolean> {
        return this.#isFetching$.asObservable();
    }

    get isSuccess$(): Observable<boolean> {
        return this.#isSuccess$.asObservable();
    }

    get isError$(): Observable<boolean> {
        return this.#isError$.asObservable();
    }

    get isFetchedYet(): Observable<boolean> {
        return this.#isFetchedYet;
    }

    readonly #update: FetcherFunction<T>;

    #data$: BehaviorSubject<T | undefined>;
    #isFetching$: BehaviorSubject<boolean>;
    #isSuccess$: BehaviorSubject<boolean>;
    #isError$: BehaviorSubject<boolean>;
    readonly #isFetchedYet: Observable<boolean>;

    protected constructor(update: FetcherFunction<T>) {
        this.#update = update;
        this.#data$ = new BehaviorSubject<T | undefined>(undefined);
        this.#isFetching$ = new BehaviorSubject<boolean>(false);
        this.#isSuccess$ = new BehaviorSubject<boolean>(false);
        this.#isError$ = new BehaviorSubject<boolean>(false);
        this.#isFetchedYet = combineLatest([
            this.#isSuccess$,
            this.#isError$,
            this.#isFetching$,
        ]).pipe(
            map(
                ([isSuccess, isError, isFetching]) =>
                    isSuccess || isError || isFetching,
            ),
        );
    }

    #onSuccess = (value: T) => {
        this.#data$.next(value);
        this.#isFetching$.next(false);
        this.#isSuccess$.next(true);
        this.#isError$.next(false);
    };

    #onError = (e: unknown) => {
        this.#data$.next(undefined);
        this.#isFetching$.next(false);
        this.#isSuccess$.next(false);
        this.#isError$.next(true);
        console.log('Error on updating ReactiveState: ', e);
    };

    update<D>(params?: D, key?: any[]) {
        if (isObservable(this.#update(params))) {
            this.#isFetching$.next(true);
            (this.#update(params) as Observable<T>).subscribe({
                next: (v) => this.#onSuccess(v),
                error: this.#onError,
            });
        } else if (isPromise(this.#update(params))) {
            this.#isFetching$.next(true);
            (this.#update(params) as Promise<T>)
                .then((v) => this.#onSuccess(v))
                .then(this.#onError);
        } else {
            try {
                const value = this.#update(params) as T;
                this.#data$.next(value);
                this.#isSuccess$.next(true);
                this.#isError$.next(false);
            } catch (e) {
                this.#data$.next(undefined);
                this.#isSuccess$.next(false);
                this.#isError$.next(true);
                console.log('Error on updating ReactiveState: ', e);
            }
        }
    }

    static create<T>(update: FetcherFunction<T>) {
        return new ReactiveState<T>(update);
    }
}
