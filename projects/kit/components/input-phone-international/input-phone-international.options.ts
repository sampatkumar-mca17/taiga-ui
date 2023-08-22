import {Provider} from '@angular/core';
import {tuiCreateToken, tuiProvideOptions} from '@taiga-ui/cdk';
import {TuiCountryIsoCode} from '@taiga-ui/i18n';

export interface TuiInputPhoneInternationalOptions {
    readonly countries: readonly TuiCountryIsoCode[];
    readonly countryIsoCode: TuiCountryIsoCode;
}

export const TUI_INPUT_PHONE_INTERNATIONAL_DEFAULT_OPTIONS: TuiInputPhoneInternationalOptions =
    {
        countries: [],
        countryIsoCode: TuiCountryIsoCode.RU,
    };

/**
 * Default parameters for input phone international component
 */
export const TUI_INPUT_PHONE_INTERNATIONAL_OPTIONS = tuiCreateToken(
    TUI_INPUT_PHONE_INTERNATIONAL_DEFAULT_OPTIONS,
);

export function tuiInputPhoneInternationalOptionsProvider(
    options: Partial<TuiInputPhoneInternationalOptions>,
): Provider {
    return tuiProvideOptions(
        TUI_INPUT_PHONE_INTERNATIONAL_OPTIONS,
        options,
        TUI_INPUT_PHONE_INTERNATIONAL_DEFAULT_OPTIONS,
    );
}
