describe ("App", () => {
   it("App render: selects genre on click", () => {
    cy.visit('/');

    cy.contains('button','documentary').click().should('have.class', 'genre-select__btn--active');
    cy.contains('button', 'all').should('not.have.class', 'genre-select__btn--active')

   });
});