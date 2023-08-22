describe(`TuiHint`, () => {
    beforeEach(() => cy.viewport(720, 700));

    it(`TuiHint works`, () => {
        cy.tuiVisit(`/directives/hint`);

        cy.get(`tui-hint-example-1 tui-avatar`).trigger(`mouseenter`).tick(1000);

        cy.get(`tui-hint-example-1`)
            .first()
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`hint`);
    });

    it(`Manual hint works`, () => {
        cy.tuiVisit(`/directives/hint-manual/API?tuiHintManual=true`);

        cy.get(`tui-hint`)
            .first()
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`manual-hint`);
    });

    it(`Dark mode hint`, () => {
        cy.tuiVisit(`/directives/hint/API?tuiMode=onDark`);

        cy.get(`#demo-content span`)
            .trigger(`mouseenter`)
            .tick(1000)
            .tuiWaitBeforeScreenshot();

        cy.get(`tui-hint`).matchImageSnapshot(`on-dark-hint`);
    });

    it(`Light mode hint`, () => {
        cy.tuiVisit(`/directives/hint/API?tuiMode=onLight`);

        cy.get(`#demo-content span`)
            .trigger(`mouseenter`)
            .tick(1000)
            .tuiWaitBeforeScreenshot();

        cy.get(`tui-hint`).matchImageSnapshot(`on-light-hint`);
    });

    it(`Tooltip horizontal direction`, () => {
        cy.tuiVisit(`/components/tooltip`);
        cy.get(`tui-doc-example`)
            .first()
            .trigger(`mouseenter`, {x: 35, y: 200})
            .tick(1000)
            .tuiWaitBeforeScreenshot();

        cy.get(`tui-doc-example`).first().matchImageSnapshot(`tooltip-left`);
    });

    it(`Tooltip vertical direction`, () => {
        cy.tuiVisit(`/components/tooltip`);
        cy.get(`tui-doc-example`)
            .eq(2)
            .find(`tui-tooltip`)
            .first()
            .trigger(`mouseenter`)
            .tick(1000)
            .tuiWaitBeforeScreenshot();

        cy.get(`tui-doc-example`).eq(2).matchImageSnapshot(`tooltip-bottom`);
    });
});
