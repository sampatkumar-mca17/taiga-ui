import {Provider} from '@angular/core';
import {tuiCreateToken, tuiProvideOptions} from '@taiga-ui/cdk';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

export interface TuiInputCountOptions {
    readonly icons: Readonly<{
        up: PolymorpheusContent<Record<string, unknown>>;
        down: PolymorpheusContent<Record<string, unknown>>;
    }>;
    readonly appearance: string;
    readonly hideButtons: boolean;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    readonly postfix: string;
}

/** Default values for the input count options. */
export const TUI_INPUT_COUNT_DEFAULT_OPTIONS: TuiInputCountOptions = {
    icons: {
        up: `tuiIconPlus`,
        down: `tuiIconMinus`,
    },
    appearance: `textfield`,
    hideButtons: false,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    postfix: ``,
};

/**
 * Default parameters for input count component
 */
export const TUI_INPUT_COUNT_OPTIONS = tuiCreateToken(TUI_INPUT_COUNT_DEFAULT_OPTIONS);

export function tuiInputCountOptionsProvider(
    options: Partial<TuiInputCountOptions>,
): Provider {
    return tuiProvideOptions(
        TUI_INPUT_COUNT_OPTIONS,
        options,
        TUI_INPUT_COUNT_DEFAULT_OPTIONS,
    );
}
