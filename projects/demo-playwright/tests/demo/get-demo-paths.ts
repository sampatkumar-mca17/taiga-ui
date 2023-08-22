import {TuiDocPage, TuiDocPages} from '@taiga-ui/addon-doc';

export function tuiGetDemoPathsForE2E(
    pages: TuiDocPages,
    exclusionSection: string[] = [`Documentation`, `Foundations`, `Tools`, `Testing`],
    exclusionRoutes: string[] = [
        `/i18n`,
        `/components/primitive-checkbox`,
        `/components/theme-night`,
        `/components/preview`, // no need take screenshot of buttons
        `/components/dialog`, // just buttons
        `/dialog/custom`, // just buttons
        `/dialog/routable`, // just buttons
        `/dialog/lazy-routable`, // just buttons
        `/components/error`,
        `/icons/overview`,
        `/icons/mapping`,
        `/components/mobile-calendar`, // TODO: flaky test, need investigate
        `/components/carousel`, // TODO: create `TUI_CAROUSEL_OPTIONS` (to set `duration: 0` for E2E tests)
    ],
): string[] {
    return Array.from(
        new Set(
            flatPages(pages)
                .filter(
                    page =>
                        !exclusionSection.includes(page.section!) &&
                        !exclusionRoutes.includes(page.route),
                )
                .map(({route}) => route),
        ),
    );
}

function flatPages(pages: TuiDocPages): readonly TuiDocPage[] {
    return pages.reduce(
        (prev: readonly TuiDocPage[], next) => [
            ...prev,
            ...(`subPages` in next ? next.subPages : [next]),
        ],
        [],
    );
}
