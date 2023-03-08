const button = '[type="button"]';

describe("Test for Kiwi Cypress weekend", () => {
  beforeEach("Kiwi - main", () => {
    cy.setCookie("__kwc_agreed", "true");
    window.localStorage.setItem("bookingcom_extension_default", "false");
    cy.visit(
      "https://www.kiwi.com/en/airport/bcn/barcelona-el-prat-barcelona-spain/"
    );
  });
  // });
  //PREPISAT NAZVY V DESCRIPTION A NAZOV TESTu
  //NAJST EXTENSIONS PRE UPRAVU KODU
  Cypress._.times(10, () => {
    it("The flight to BCN is found", () => {
      cy.get(
        '[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]'
      ).click();
      cy.get(
        ".eXgNdq > .Box__StyledBox-sc-bvm5o6-0 > .Imagestyled__Img-sc-1hn1xfy-1"
      ).should("be.visible");
      cy.get("#sticky-search-form").should("be.visible");
      cy.get('[data-test="SearchFieldItem-origin"]').should("be.visible");

      cy.get('[data-test="PlacePickerInputPlace"]').contains("Barcelona BCN");

      cy.get("h1").should("be.exist").contains("Barcelona–El Prat (BCN)");
      cy.get('[data-test="PictureCard"]').eq("0").click();

      //6. Skontroluj, že si bol/a presmerovaný/á na stránku search/results so správne vyplneným search form. Ak nevieš, ako vyzerá, môžeš si to pozrieť tu.
      //dorobit test
      cy.url().should("include", "/search/results");
      cy.log("URL contains search/results");
      // cy.get('[data-test="SearchForm-wrapper"]')
      cy.get('[data-test="PlacePickerInputPlace"]').contains("Barcelona");
      //tu doplnit ze from Barcelona, a kde doplnit nie konkretne miesto ale napriklad ze nie je prazdne ale vyplnene a pod.

      cy.get('[data-test="PassengersField"]').click();
      cy.get('[data-test="BagsPopup-cabin"]').find(button).eq("1").click();

      cy.get(
        ".ButtonWrapsstyled__ButtonTabletWrap-sc-zf781k-0 > .ButtonPrimitive__StyledButtonPrimitive-sc-j8pavp-0 > .ButtonPrimitiveContent__StyledButtonPrimitiveContent-sc-1nfggrh-0 > .ButtonPrimitiveContentChildren__StyledButtonPrimitiveContentChildren-sc-mra4yy-0 > :nth-child(2)"
      ).contains("1");

      cy.get('[data-test="ResultCardWrapper"]', { timeout: 15000 })
        .eq("0")
        .should("be.visible")
        .find('[data-test="BookingButton"]')
        .contains("Select")
        .click();

      cy.get('[data-test="MagicLogin-RequiredLogin"]')
        .should("be.visible")
        .find('[data-test="MagicLogin-GuestTextLink"]')
        .contains("Continue as a guest")
        .click();

      // 10. Over, že si sa dostal/a na booking stránku (rezervačný formulár).
      cy.get('[data-test="ReservationHead"]', { timeout: 15000 })
        //data-test="CommonJourneyHead"
        .should("be.visible")
        .find("h1")
        .first()
        .contains("Barcelona");
    });
  });
});
