// cspell:disable
import {TuiCurrency, TuiCurrencyCode} from '@taiga-ui/addon-commerce';

export const TUI_CODE_DICTIONARY: Record<TuiCurrency, TuiCurrencyCode> = {
    [TuiCurrency.Ruble]: TuiCurrencyCode.Ruble,
    [TuiCurrency.Dollar]: TuiCurrencyCode.Dollar,
    [TuiCurrency.MexicanPeso]: TuiCurrencyCode.MexicanPeso,
    [TuiCurrency.SingaporeDollar]: TuiCurrencyCode.SingaporeDollar,
    [TuiCurrency.AustralianDollar]: TuiCurrencyCode.AustralianDollar,
    [TuiCurrency.HongKongDollar]: TuiCurrencyCode.HongKongDollar,
    [TuiCurrency.CanadianDollar]: TuiCurrencyCode.CanadianDollar,
    [TuiCurrency.Euro]: TuiCurrencyCode.Euro,
    [TuiCurrency.Pound]: TuiCurrencyCode.Pound,
    [TuiCurrency.Baht]: TuiCurrencyCode.Baht,
    [TuiCurrency.TurkishLira]: TuiCurrencyCode.TurkishLira,
    [TuiCurrency.YuanRenminbi]: TuiCurrencyCode.YuanRenminbi,
    [TuiCurrency.Yen]: TuiCurrencyCode.Yen,
    [TuiCurrency.IsraeliShekel]: TuiCurrencyCode.IsraeliShekel,
    [TuiCurrency.IndianRupee]: TuiCurrencyCode.IndianRupee,
    [TuiCurrency.SwissFranc]: TuiCurrencyCode.SwissFranc,
    [TuiCurrency.ArmenianDram]: TuiCurrencyCode.ArmenianDram,
    [TuiCurrency.Won]: TuiCurrencyCode.Won,
    [TuiCurrency.Tenge]: TuiCurrencyCode.Tenge,
    [TuiCurrency.Hryvnia]: TuiCurrencyCode.Hryvnia,
    [TuiCurrency.UzbekSum]: TuiCurrencyCode.UzbekSum,
    [TuiCurrency.KyrgyzstanSom]: TuiCurrencyCode.KyrgyzstanSom,
    [TuiCurrency.Dirham]: TuiCurrencyCode.Dirham,
    [TuiCurrency.TajikistaniSomoni]: TuiCurrencyCode.TajikistaniSomoni,
    [TuiCurrency.MalaysianRinggit]: TuiCurrencyCode.MalaysianRinggit,
    [TuiCurrency.BelarusianRuble]: TuiCurrencyCode.BelarusianRuble,
    [TuiCurrency.GeorgianLari]: TuiCurrencyCode.GeorgianLari,
    [TuiCurrency.AzerbaijaniManat]: TuiCurrencyCode.AzerbaijaniManat,
    [TuiCurrency.SriLankanRupee]: TuiCurrencyCode.SriLankanRupee,
    [TuiCurrency.SerbianDinar]: TuiCurrencyCode.SerbianDinar,
    [TuiCurrency.SaudiRiyal]: TuiCurrencyCode.SaudiRiyal,
    [TuiCurrency.MongolianTugrik]: TuiCurrencyCode.MongolianTugrik,
    [TuiCurrency.SouthAfricanRand]: TuiCurrencyCode.SouthAfricanRand,
    [TuiCurrency.IranianRial]: TuiCurrencyCode.IranianRial,
    [TuiCurrency.IndonesianRupiah]: TuiCurrencyCode.IndonesianRupiah,
    [TuiCurrency.VietnameseDong]: TuiCurrencyCode.VietnameseDong,
    [TuiCurrency.NewTurkmenManat]: TuiCurrencyCode.NewTurkmenManat,
    [TuiCurrency.BrazilianReal]: TuiCurrencyCode.BrazilianReal,
};

export function tuiGetCodeByCurrency(code: TuiCurrency): TuiCurrencyCode | null {
    return TUI_CODE_DICTIONARY[code] ?? null;
}
