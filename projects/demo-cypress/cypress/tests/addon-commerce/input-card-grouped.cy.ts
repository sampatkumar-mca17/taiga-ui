describe(`InputCardGrouped`, () => {
    describe(`API mode`, () => {
        beforeEach(() => {
            cy.viewport(`macbook-13`);
            cy.tuiVisit(`components/input-card-grouped/API`);

            cy.get(`#demo-content`).should(`be.visible`).as(`wrapper`);
            cy.get(`@wrapper`).find(`tui-svg`).first().as(`clearIcon`);
        });

        it(`set value and clear after`, () => {
            cy.get(`@wrapper`)
                .findByAutomationId(`tui-input-card-grouped__card`)
                .type(`1234 4567 8910 1112`);

            closeTuiAlerts();

            cy.get(`@wrapper`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`01-input-card-grouped-filled`);

            cy.get(`@clearIcon`).click({force: true});

            cy.get(`@wrapper`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`02-input-card-grouped-cleared`);

            cy.get(`@wrapper`).click({force: true});

            cy.get(`@wrapper`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`03-input-card-grouped-unfocused`);
        });

        it(`set value and disable`, () => {
            cy.get(`@wrapper`)
                .findByAutomationId(`tui-input-card-grouped__card`)
                .type(`1234 4567 1000 1112`);

            closeTuiAlerts();

            cy.get(`.t-table tr`)
                .eq(1) // formControl.disable()
                .findByAutomationId(`tui-toggle__checkbox`)
                .click({force: true});

            cy.get(`@wrapper`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`04-input-card-grouped-disabled`);
        });

        // prevent flaky screenshot tests
        function closeTuiAlerts(): void {
            cy.get(`tui-alert-host`)
                .findByAutomationId(`tui-notification__close`)
                .click({force: true});
        }
    });

    describe(`Examples`, () => {
        beforeEach(() => {
            cy.viewport(`macbook-13`);
            cy.tuiVisit(`components/input-card-grouped`);
        });

        it(`input card grouped with validation`, () => {
            cy.get(`tui-doc-example[heading="With validation"]`)
                .findByAutomationId(`tui-doc-example`)
                .should(`be.visible`)
                .as(`example`);

            cy.get(`@example`).tuiScrollIntoView();

            cy.get(`@example`)
                .findByAutomationId(`tui-input-card-grouped__card`)
                .as(`cardNumber`);

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`05-default-state-input-card`);

            cy.get(`@cardNumber`).type(`5213 0000 4039 5834`).tuiWaitBeforeAction();

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`06-input-card-with-value`);

            cy.get(`@cardNumber`).should(`be.visible`).focus();

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`07-input-card-with-value-focus-edit-card`);

            cy.get(`@cardNumber`)
                .should(`be.visible`)
                .focused()
                .tuiTab(`forward`)
                .tuiWaitBeforeAction();

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`08-input-card-with-value-tab-to-expired`);

            cy.get(`@example`)
                .findByAutomationId(`tui-input-card-grouped__expire`)
                .should(`be.visible`)
                .as(`cardExpired`);

            cy.get(`@cardExpired`).type(`02/38`);

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`09-input-card-with-value-expire-filled`);

            cy.get(`@example`)
                .findByAutomationId(`tui-input-card-grouped__cvc`)
                .should(`be.visible`)
                .as(`cvc`);

            cy.get(`@cvc`).type(`123`);

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`10-input-card-with-value-cvc-filled`);

            cy.get(`@example`).find(`tui-svg`).eq(1).as(`clearIcon`);
            cy.get(`@clearIcon`).click({force: true});

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`11-input-card-with-focused-after-clear`);

            cy.get(`@example`).click({force: true});

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`12-default-state-input-card`);
        });

        it(`input card grouped with saved cards`, () => {
            cy.get(`tui-doc-example[heading="With saved cards"]`)
                .findByAutomationId(`tui-doc-example`)
                .should(`be.visible`)
                .as(`example`);

            cy.get(`@example`).tuiScrollIntoView();

            cy.get(`@example`)
                .findByAutomationId(`tui-input-card-grouped__card`)
                .as(`cardNumber`);

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`13-default-prefilled-state-input-card`);

            cy.get(`@cardNumber`)
                .should(`have.css`, `pointer-events`)
                .and(`match`, /none/);

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`14-prefilled-value-cannot-be-edit`);

            cy.get(`@example`)
                .findByAutomationId(`tui-input-card-grouped__cvc`)
                .focus()
                .type(`123`);

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`15-input-card-with-value-cvc-filled`);

            cy.get(`@example`).find(`tui-svg`).eq(1).as(`clearIcon`);
            cy.get(`@clearIcon`).click({force: true});

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`16-input-card-with-focused-after-clear`);

            cy.get(`@example`).click({force: true});

            cy.get(`@example`)
                .tuiWaitBeforeScreenshot()
                .matchImageSnapshot(`17-default-prefilled-state-input-card`);
        });
    });

    it(`expired field should be clickable after reset of prefilled value`, () => {
        cy.tuiVisit(`components/input-card-grouped#custom-labels`);

        cy.get(`tui-doc-example[heading="Custom labels"]`)
            .tuiScrollIntoView()
            .as(`wrapper`);

        cy.get(`@wrapper`).find(`tui-input-card-grouped`).as(`input-card-grouped`);

        cy.get(`@input-card-grouped`).find(`tui-svg`).eq(1).as(`clearIcon`);

        cy.get(`@input-card-grouped`)
            .findByAutomationId(`tui-input-card-grouped__expire`)
            .should(`have.css`, `pointer-events`, `none`);

        cy.get(`@clearIcon`).click({force: true});

        cy.get(`@input-card-grouped`)
            .findByAutomationId(`tui-input-card-grouped__card`)
            .type(`5586200071492158`);

        cy.get(`@input-card-grouped`)
            .findByAutomationId(`tui-input-card-grouped__expire`)
            .should(`have.css`, `pointer-events`, `auto`)
            .type(`12/25`);
    });
});
