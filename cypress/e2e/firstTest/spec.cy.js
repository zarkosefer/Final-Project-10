import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";

 

Given("I navigate to the site",()=>{

  cy.visit('/');

});

 

When("I enter valid credentials",()=>{});

 

Then("I am successfully logged",()=>{});