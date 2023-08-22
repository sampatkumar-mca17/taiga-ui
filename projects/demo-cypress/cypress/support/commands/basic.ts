import {tuiClickOutside} from '@demo-cypress/support/helpers/click-outside';
import {
    tuiFindDocExample,
    tuiGetDocExample,
} from '@demo-cypress/support/helpers/example-id-utils';
import {tuiFocus} from '@demo-cypress/support/helpers/focus';
import {tuiHide} from '@demo-cypress/support/helpers/hide';
import {tuiScrollIntoView} from '@demo-cypress/support/helpers/scroll-into-view';
import {tuiSetLanguage} from '@demo-cypress/support/helpers/set-language';
import {tuiSetNightMode} from '@demo-cypress/support/helpers/set-night-mode';
import {tuiShow} from '@demo-cypress/support/helpers/show';
import {tuiTab} from '@demo-cypress/support/helpers/type-tab';
import {tuiVisit} from '@demo-cypress/support/helpers/visit';
import {
    tuiWaitBeforeAction,
    tuiWaitBeforeScreenshot,
} from '@demo-cypress/support/helpers/wait-before-screenshot';
import {tuiWaitCodeHighlight} from '@demo-cypress/support/helpers/wait-code-highlight';
import {tuiWaitKitDialog} from '@demo-cypress/support/helpers/wait-kit-dialog';
import {tuiBeInViewportAssertion, tuiWaitAllImgInside} from '@taiga-ui/testing/cypress';

declare global {
    namespace Cypress {
        interface Chainable {
            getByAutomationId(automationId: string): Chainable<JQuery>;

            findByAutomationId(automationId: string): Chainable<JQuery>;

            tuiVisit: typeof tuiVisit;
            tuiHide: typeof tuiHide;
            tuiShow: typeof tuiShow;
            tuiWaitKitDialog: typeof tuiWaitKitDialog;
            tuiSetLanguage: typeof tuiSetLanguage;
            tuiSetNightMode: typeof tuiSetNightMode;
            tuiWaitCodeHighlight: typeof tuiWaitCodeHighlight;
            tuiClickOutside: typeof tuiClickOutside;

            tuiTab(direction: 'backward' | 'forward'): Chainable;
            tuiGetByExampleId(): Chainable;
            tuiFindByExampleId(): Chainable;
            tuiWaitBeforeAction(): Chainable;
            tuiWaitBeforeScreenshot(): Chainable;
            tuiScrollIntoView(): Chainable;
            tuiFocus(): Chainable;
            tuiWaitAllImgInside(enabled?: boolean): Chainable;
        }

        interface Chainer<Subject> {
            (chainer: 'be.inViewport'): Chainable<Subject>;
        }
    }
}

Cypress.Commands.add(`getByAutomationId`, id => cy.get(`[automation-id=${id}]`));
Cypress.Commands.add(`tuiGetByExampleId`, tuiGetDocExample);
Cypress.Commands.add(
    `findByAutomationId`,
    {prevSubject: true},
    <S>(subject: S, id: string) =>
        /**
         * `subject` is just `jQuery`-element which has method `.find()`.
         * This method doesn't have {@link https://docs.cypress.io/guides/core-concepts/retry-ability retry-ability}!
         * ___
         * `cy.wrap(subject)` is a `$Chainer`-element (cypress built-in implementation) which also has method `.find()`.
         * This method has retry-ability!
         */
        cy.wrap(subject, {log: false}).find(`[automation-id=${id}]`),
);
Cypress.Commands.add(`tuiVisit`, tuiVisit);
Cypress.Commands.add(`tuiWaitKitDialog`, tuiWaitKitDialog);
Cypress.Commands.add(`tuiSetLanguage`, tuiSetLanguage);
Cypress.Commands.add(`tuiSetNightMode`, tuiSetNightMode);
Cypress.Commands.add(`tuiWaitCodeHighlight`, tuiWaitCodeHighlight);
Cypress.Commands.add(`tuiHide`, tuiHide);
Cypress.Commands.add(`tuiShow`, tuiShow);
Cypress.Commands.add(`tuiFindByExampleId`, {prevSubject: true}, <S>(subject: S) =>
    tuiFindDocExample<S>(subject),
);
Cypress.Commands.add(`tuiClickOutside`, tuiClickOutside);
Cypress.Commands.add(
    `tuiWaitBeforeScreenshot`,
    {prevSubject: [`optional`]},
    tuiWaitBeforeScreenshot,
);
Cypress.Commands.add(
    `tuiWaitBeforeAction`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    tuiWaitBeforeAction,
);
Cypress.Commands.add(
    `tuiTab`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    tuiTab,
);
Cypress.Commands.add(
    `tuiScrollIntoView`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    tuiScrollIntoView,
);
Cypress.Commands.add(
    `tuiFocus`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    tuiFocus,
);
Cypress.Commands.add(
    `tuiWaitAllImgInside`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    tuiWaitAllImgInside,
);

chai.use(tuiBeInViewportAssertion);
