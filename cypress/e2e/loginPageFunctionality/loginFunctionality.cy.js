import {loginForm} from '../../support/POM/loginPage'
import { errorMessages } from '../../fixtures/loginPage/constLoginPage'
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const customer=Cypress.env('customer')
const agent=Cypress.env('agent')
const wrongCredentials=Cypress.env('wrongCredentials')

Given('I am on the Home Page',()=>{
    cy.visit('/')
    cy.url().should('contain','login')
    cy.get(loginForm.pageTitle).should('have.text', 'Login')
})

//I want to check customer login with empty email and password
When('I click on Login button',()=>{
    cy.get(loginForm.loginButton).click()
})

Then('proper error message should appear',()=>{
     cy.get(loginForm.errorMessage2).should('be.visible')
})

//I want to check customer login with valid email and invalid password
When('I enter valid email and invalid password click on Login button',()=>{
    cy.get(loginForm.inputEmail).type(customer.email)
    cy.get(loginForm.inputPassword).type(wrongCredentials.password)
    cy.get(loginForm.loginButton).click()
})

Then('wrong password error message should appear',()=>{
    cy.get(loginForm.errorMessage).should('be.visible')
    cy.get(loginForm.errorMessage).should('contain',errorMessages.wrongCredentials)     
})

//I want to check customer login with invalid email and valid password
When('I enter invalid email and valid password click on Login button',()=>{
    cy.get(loginForm.inputEmail).type(wrongCredentials.email)
    cy.get(loginForm.inputPassword).type(customer.password)
    cy.get(loginForm.loginButton).click()
})
Then('wrong email error message should appear',()=>{
    cy.get(loginForm.errorMessage).should('be.visible')
    cy.get(loginForm.errorMessage).should('contain',errorMessages.wrongCredentials)
})

//I want to check customer login with valid credentials
When('I enter valid customer credentials and click on Login button',()=>{
    cy.get(loginForm.inputEmail).type(customer.email)
    cy.get(loginForm.inputPassword).type(customer.password)
    cy.get(loginForm.loginButton).click()
})
Then('I land on the home page as customer',()=>{
    cy.url().should('contain','dashboard')
    cy.title().should('eq','Dashboard - PHPTRAVELS')
})

//I want to check admin login with valid credentials
When('I enter valid agent credentials and click on Login button',()=>{
    cy.get(loginForm.inputEmail).type(agent.email)
    cy.get(loginForm.inputPassword).type(agent.password)
    cy.get(loginForm.loginButton).click()
})

Then('I land on the home page as agent',()=>{
    cy.url().should('contain','dashboard')
    cy.title().should('eq','Dashboard - PHPTRAVELS')
})
