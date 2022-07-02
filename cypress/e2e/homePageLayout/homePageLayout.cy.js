import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const customer=Cypress.env('customer')

import { homePage } from '../../support/POM/homePage'


Given('I am on the Home Page',()=>{
    cy.login(customer.email,customer.password)
    cy.url().should('contain','dashboard')
    cy.title().should('eq','Dashboard - PHPTRAVELS')
})

When('I check the header contents length of Home Page',()=>{
    cy.get(homePage.headerContent).should('have.length',8)
})

Then('I want to see following elements on Home Page header',()=>{
    cy.headerContentValidation()
})

When('I check the sidenav contents length of Home Page',()=>{
    cy.get(homePage.sideNavContent).should('have.length',5);
})

Then('I want to see following elements on Home Page sidenav',()=>{
    cy.sideNavBarContentValidation()
})

When('I check the body content of Home Page',()=>{
    cy.get(homePage.bodyContent).should('have.length', 4)
})

Then('I want to see following elements on Home Page body',()=>{
    cy.get(homePage.searchText).should('contain.text', 'Recent Searches')
    cy.get(homePage.searchButton).should('be.visible')
    cy.APIhomeContentValidation()
})