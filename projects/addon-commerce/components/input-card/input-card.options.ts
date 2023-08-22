import {Provider} from '@angular/core';
import {TuiPaymentSystem} from '@taiga-ui/addon-commerce/types';
import {
    TUI_PAYMENT_SYSTEM_ICONS,
    tuiGetPaymentSystem,
} from '@taiga-ui/addon-commerce/utils';
import {tuiCreateToken, TuiHandler, tuiProvideOptions} from '@taiga-ui/cdk';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

export interface TuiInputCardOptions {
    cardSrc: PolymorpheusContent;
    readonly autocompleteEnabled: boolean;
    readonly icons: Record<TuiPaymentSystem, string>;
    readonly paymentSystemHandler: TuiHandler<
        string | null | undefined,
        TuiPaymentSystem | null
    >;
}

// TODO: Move payment system icons into its own token in 4.0
export const TUI_INPUT_CARD_DEFAULT_OPTIONS: TuiInputCardOptions = {
    icons: TUI_PAYMENT_SYSTEM_ICONS,
    cardSrc: ``,
    paymentSystemHandler: tuiGetPaymentSystem,
    autocompleteEnabled: false,
};

export const TUI_INPUT_CARD_OPTIONS = tuiCreateToken(TUI_INPUT_CARD_DEFAULT_OPTIONS);

export function tuiInputCardOptionsProvider(
    options: Partial<TuiInputCardOptions>,
): Provider {
    return tuiProvideOptions(
        TUI_INPUT_CARD_OPTIONS,
        options,
        TUI_INPUT_CARD_DEFAULT_OPTIONS,
    );
}
