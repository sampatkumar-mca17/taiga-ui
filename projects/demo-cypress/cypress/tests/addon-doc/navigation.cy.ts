describe(`Navigation`, () => {
    it(`getting started / [light mode]`, () => {
        cy.tuiVisit(`/getting-started`, {hideNavigation: false, hideHeader: false});

        cy.get(`tui-doc-navigation`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`01-tui-doc-navigation-light-mode`);
    });

    it(`getting started / [night mode]`, () => {
        cy.tuiVisit(`/getting-started`, {
            hideNavigation: false,
            hideHeader: false,
            enableNightMode: true,
        });

        cy.get(`tui-doc-navigation`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`02-tui-doc-navigation-night-mode`);
    });

    describe(`anchor links navigation works`, {scrollBehavior: false}, () => {
        it(`scroll to \`tui-doc-example\``, () => {
            cy.tuiVisit(`/components/input#table`);

            cy.get(`#table`).should(`be.inViewport`);
        });

        it(`scroll to \`tui-doc-code\``, () => {
            cy.tuiVisit(`/getting-started#options`);

            cy.get(`#options`).should(`be.visible`).should(`be.inViewport`);
        });

        it(`scroll after click on link with anchor`, () => {
            cy.tuiVisit(`/getting-started`);

            cy.wait(500); // @note: fix flaky in proprietary
            cy.get(`a[fragment="root"]`).should(`be.visible`).click();
            cy.get(`#root`).should(`be.inViewport`);
        });
    });
});
