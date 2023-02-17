import {inject, InjectionToken, Provider, Type} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';
import {TuiRectAccessor} from '@taiga-ui/core/abstract';

export const TUI_VIEWPORT = new InjectionToken<TuiRectAccessor>(
    `[TUI_VIEWPORT]: Viewport accessor`,
    {
        factory: () => {
            const windowRef = inject(WINDOW);

            return {
                getClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        right: windowRef.innerWidth,
                        bottom: windowRef.innerHeight,
                        width: windowRef.innerWidth,
                        height: windowRef.innerHeight,
                    };
                },
            };
        },
    },
);

export function tuiAsViewport(useExisting: Type<TuiRectAccessor>): Provider {
    return {
        provide: TUI_VIEWPORT,
        useExisting,
    };
}