import {InjectionToken} from '@angular/core';

/** @deprecated use {@link tuiCreateToken} instead */
export function tuiCreateOptions<T>(defaults: T): InjectionToken<T> {
    return new InjectionToken<T>(``, {
        factory: () => defaults,
    });
}
