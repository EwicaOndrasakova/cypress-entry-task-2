describe("Test for Kiwi Cypress weekend", () => {
  beforeEach("Kiwi - main", () => {
    cy.setCookie("__kwc_agreed", "true");
    window.localStorage.setItem("bookingcom_extension_default", "false");
    cy.visit(
      "https://www.kiwi.com/en/airport/bcn/barcelona-el-prat-barcelona-spain/"
    );
    cy.viewport(1200, 860);
  });

  Cypress._.times(10, () => {
    it("The flight from Barcelona is found", () => {
      //Skontroluj, že všetky sekcie a mapa sa zobrazia na stránke.
      cy.get("#sticky-search-form").should("be.visible");
      cy.get(departureDestinationPicker).should("be.visible");
      cy.get(arrivalDestinationPicker).should("be.visible");
      cy.get(departureDestinationMapPreview).should("be.visible");
      cy.get(trendingDestinationsList).should("be.visible");

      // Skontroluj, že v search form je origin správne nastavený na Barcelona BCN.
      cy.get(searchFormOrigin).should("be.visible").contains("Barcelona BCN");

      //Skontroluj, že H1 element má správny text “Barcelona–El Prat (BCN)”.
      cy.get("h1")
        .should("be.exist")
        .should("have.text", "Barcelona–El Prat (BCN)");

      //V sekcii “ Popular destinations from Barcelona–El Prat (BCN)” klikni na prvú picture card.
      cy.get(popularDesatinationsPictureCard).eq(0).click();

      //Skontroluj, že si bol/a presmerovaný/á na stránku search/results so správne vyplneným search form.
      cy.url().should("include", "/search/results");
      cy.log("URL contains search/results");

      //Pridaj vo filtroch jednu príručnú batožinu.
      cy.get(passengersDropdown).click();
      cy.get(cabinBaggageButton).find(button).eq(1).click();
      cy.get(passengersFieldDoneButton).click();

      //Presvedč sa, že sa ti načítali nové výsledky.
      //Pokračuj na rezervačný formulár z prvého výsledku (klikni na tlačidlo "Select"/"Rezervovať").
      cy.get(activeFiltersField).should("have.text", "1 filter active");
      cy.get(resultCardPrice).should("be.visible");
      cy.get(resultCard, { timeout: 15000 })
        .eq(0)
        .should("be.visible")
        .find(bookingButton);

      cy.get(bookingButton).contains("Select").click();

      //Magic login
      cy.get(loginModal)
        .should("be.visible")
        .find(continueAsGuestButton)
        .click();

      // Over, že si sa dostal/a na booking stránku (rezervačný formulár).
      cy.get(reservationContent).should("be.visible");
      cy.get(reservationHead, { timeout: 15000 }).should("be.visible");
      cy.get(reservationItinerary)
        .find("h2")
        .should("have.text", "Trip summary");

      cy.get(reservationBillItems).should("be.visible");
      cy.get(reservationBoxPrice).should("be.visible");
    });
  });
});

const button = '[type="button"]';
const bookingButton = '[data-test="BookingButton"]';
const departureDestinationPicker = '[data-test="PlacePickerInput-origin"]';
const arrivalDestinationPicker = '[data-test="PlacePickerInput-destination"]';
const departureDestinationMapPreview =
  ".eXgNdq > .Box__StyledBox-sc-bvm5o6-0 > .Imagestyled__Img-sc-1hn1xfy-1";
const trendingDestinationsList = '[data-test="TrendingDestinations"]';
const searchFormOrigin = '[data-test="SearchFieldItem-origin"]';
const popularDesatinationsPictureCard = '[data-test="PictureCard"]';
const passengersDropdown = '[data-test="PassengersField"]';
const cabinBaggageButton =
  ':nth-child(2) > .BagsPickerstyled__Wrapper-sc-h2j3jl-0 > [data-test="BagsPopup-cabin"]';
const passengersFieldDoneButton = '[data-test="PassengersFieldFooter-done"]';
const resultCard = '[data-test="ResultCardWrapper"]';
const activeFiltersField =
  ".FiltersSidebarstyled__CountAlert-sc-k6gw0b-1 > .Text__StyledText-sc-1dj99rd-0";
const resultCardPrice = '[data-test="ResultCardPrice"]';
const loginModal = '[data-test="MagicLogin-RequiredLogin"]';
const continueAsGuestButton = '[data-test="MagicLogin-GuestTextLink"]';
const reservationItinerary =
  '[data-test="ReservationItinerary"] > .cveCbd > .SDOJk > .jerigJ > .Stack__StyledStack-sc-53pobq-0';
const reservationBoxPrice = '[data-test="ReservationBillBoxItemPrice"]';
const reservationContent = '[data-test="Reservation-content"]';
const reservationHead = '[data-test="ReservationHead"]';
const reservationBillItems = ".ReservationBill-items-wrapper";
