import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
import { homePage } from '../../support/POM/homePage'



Given('I am on the Home Page My Bookings',()=>{
    cy.landingOnMyBookingsPage()
})
// Checking the flight booking functionality
When('I click on the Flight button',()=>{
    cy.get(homePage.flightsButton).click()
})

And('Enter flight information, and click Search button',()=>{
    cy.takeOffCity()
    cy.landingCity()
    cy.inputDate()
})

And('Choose the cheapest flight',()=>{
    cy.chooseCheapestFlight()
})

And('Confirm the Booking with Bank transfer paying',()=>{
    cy.confirmBookinGViaBank()

})

Then('My booking on the Invoice Page should contain the selected flight amount',()=>{
    cy.validatingPriceFlight()
})

//Checking the layout of the flight booking page
Then('I want to check elements on the flight page',()=>{
    cy.validatingFlightPageLayout()
})