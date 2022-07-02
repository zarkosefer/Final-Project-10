import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import {loginForm} from '../../support/POM/loginPage'


Given('I am on the Login Page',()=>{
    cy.visit('/')
    cy.url().should('contain','login')
    cy.get(loginForm.pageTitle).should('have.text', 'Login')
})

//I want to check header content
When('I check the header contents length of Login Page',()=>{
    cy.get(loginForm.leftHeader).should('have.length',2)
    cy.get(loginForm.rightHeader).should('have.length',4)
})
Then('I want to see following elements on Login Page header',()=>{
    cy.languageDropdownValueValidation()
    cy.currencyDropdownValueValidation()
    cy.supplierDropdownValueValidation()
    cy.agentsDropdownValueValidation()
})

//I want to check body content
When('I check the body content of Login Page',()=>{
    cy.get(loginForm.bodyTitle).should('have.text', 'Login')
    cy.get(loginForm.bodyContent).should('have.text', 'Please enter your account credentials below')
})
Then('I want to see following elements on Login Page body',()=>{
    cy.passwordOptionsValidation()
})

//I want to check footer content
When('I check the footer contents length of Login Page',()=>{
    cy.get(loginForm.footerContent).should('have.length',15)
    cy.get(loginForm.footerSocialMedia).should('have.length',6)
})
Then('I want to see following elements on Login Page footer',()=>{
   cy.footerTextValidation()
})