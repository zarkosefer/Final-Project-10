import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

import {homePage} from '../../support/POM/homePage'
import { errorMessages } from '../../fixtures/homePage/constHomePage'
const customer=Cypress.env('customer')



Given('I am on the Home Page',()=>{
    cy.login(customer.email,customer.password)
    cy.url().should('contain','dashboard')
    cy.title().should('eq','Dashboard - PHPTRAVELS')
})

When('I click on the Add funds button',()=>{
    cy.get(homePage.addFundsButton).click()
})

//Testing the adding fund functionality via Bank
And('I select bank radio button, enter amount and click on pay now button',()=>{
    cy.enterRandomBankAmount()
})

Then('Amount on the bank payment slip should equal the amount entered on the Home Page',()=>{
    cy.addingFundsValidation()
})

//Testing the adding fund functionality via Paypall
And('I select paypall radio button, enter amount and click on pay now button',()=>{
    cy.enterRandomPaypallAmount()
})

Then('Amount on the paypal payment slip should equal the amount entered on the Home Page',()=>{
 cy.addingFundsValidation()
})

//Testing the adding fund functionality via Stripe
And('I select stripe radio button, enter amount and click on pay now button',()=>{
   cy.enterRandomStripeAmount()
})

Then('Error message gets shown on the screen',()=>{
    cy.get(homePage.errorMessage1).should('have.text', '404 Error')
    cy.get(homePage.errorMessage2).should('have.text','Page not Found')
})

//Testing adding fund functionality with empty input field
And('I select bank radio button, clear amount field and click on pay now button',()=>{
    cy.get(homePage.bankTransferCheckButton).click()
    cy.get(homePage.inputAmount).clear()
    cy.get(homePage.payNowButton).click()
})

Then('Application crashes and i get error messages',()=>{
    cy.get(homePage.brokenAppTitle).should('have.text',errorMessages.crashAppTitle)
    cy.get(homePage.brokenAppMessage).should('contain.text',errorMessages.crashAppMessage)
})





