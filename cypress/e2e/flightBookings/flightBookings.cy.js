import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
import { homePage } from '../../support/POM/homePage'
import { flightsForm } from '../../support/POM/flightBooking'
import { takeOffDestination, landingDestination, fheader,flightType } from '../../fixtures/flightPage/constFlightPage'

const customer=Cypress.env('customer')





Given('I am on the Home Page My Bookings',()=>{
    cy.landingOnMyBookingsPage()
})
// Checking the flight booking functionality
When('I click on the Flight button',()=>{
    cy.get(homePage.flightsButton).click()
})

And('Enter flight information, and click Search button',()=>{
    cy.get(flightsForm.takeoff).type(takeOffDestination.search)
    cy.get(flightsForm.takeoffResult).each(($el,index,$list)=>{
        const city=$el.text()
        if(city.includes(takeOffDestination.place)){
            cy.wrap($el).click()
        }
    })
    cy.get(flightsForm.landing).type(landingDestination.search)
    cy.get(flightsForm.landingResult).each(($el,index,$list)=>{
        const city=$el.text()
        if(city.includes(landingDestination.place)){
            cy.wrap($el).click()
        }
    })
    cy.get(flightsForm.departureDate).clear().type('22-08-2022')
    cy.get(flightsForm.searchButton).click()
})

And('Choose the cheapest flight',()=>{
    cy.chooseCheapestFlight()
})

And('Confirm the Booking with Bank transfer paying',()=>{
    cy.get(flightsForm.termsAndConditionsChb).click({force:true})
    cy.get(flightsForm.confirmBookingButton).click()

})

Then('My booking on the Invoice Page should contain the selected flight amount',()=>{
   cy.validatingPriceFlight()
})

//Checking the layout of the flight booking page
Then('I want to check elements on the flight page',()=>{
    cy.get(flightsForm.table).should('exist').and('be.visible')
    cy.get(flightsForm.headers).each(($el,index,list)=>{
        cy.wrap($el)
        .should('contain.text',fheader.items[index])
    })
    cy.get(flightsForm.classOption).each(($el,index,list)=>{
        cy.wrap($el)
        .should('contain.text',flightType.items[index])
    })
})