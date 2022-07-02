
import { language,currency} from '../fixtures/loginPage/constLoginPage'
import {loginForm} from '../support/POM/loginPage'

import {navBar,header} from '../fixtures/homePage/constHomePage'
import {homePage,randomInteger} from '../support/POM/homePage'

import {flightsForm} from '../support/POM/flightBooking'
import { takeOffDestination, landingDestination, fheader,flightType } from '../fixtures/flightPage/constFlightPage'

const customer=Cypress.env('customer')

//LOGIN PAGE COMMANDS
Cypress.Commands.add("login",(email, password)=>{
    cy.visit('/')
    cy.get(loginForm.inputEmail).type(email)
    cy.get(loginForm.inputPassword).type(password)
    cy.get(loginForm.loginButton).click()
})

Cypress.Commands.add('languageDropdownValueValidation',()=>{
    cy.get('#languages').click()
    cy.get(loginForm.languageDropdown).each(($el,index,$list)=>{
        cy.wrap($el)
        .should('include.text',language.languages[index])           
        })
})

Cypress.Commands.add('currencyDropdownValueValidation',()=>{
    cy.get('#currency').click()
    cy.get(loginForm.currencyDropdown).each(($el,index)=>{
            cy.wrap($el)
            .should('include.text', currency.currencies[index] )
        })
})

Cypress.Commands.add('supplierDropdownValueValidation',()=>{
    cy.get('#supplier').should('contain.text', 'Supplier').click()
    cy.get(loginForm.supplierDropdown).then((supplier)=>{
            expect(supplier[0]).to.contain.text('Signup')
            expect(supplier[1]).to.contain.text('Login')
        })
})

Cypress.Commands.add('agentsDropdownValueValidation',()=>{
    cy.get('#agents').should('contain.text', 'Agents').click()
    cy.get(loginForm.agentsDropdown).then((agents)=>{
            expect(agents[0]).to.contain.text('Signup')
            expect(agents[1]).to.contain.text('Login')
        })
})

Cypress.Commands.add('passwordOptionsValidation',()=>{
    cy.get(loginForm.passwordOption).then(passwordOptions=>{
        expect(passwordOptions[0]).to.contain.text('Remember Me')
        expect(passwordOptions[1]).to.contain.text('Reset Password')
    })
})

Cypress.Commands.add('footerTextValidation',()=>{
    cy.get(loginForm.footerContent).then(footerText=>{
        expect(footerText[0]).to.contain.text('Company')
        expect(footerText[5]).to.contain.text('Support')
        expect(footerText[10]).to.contain.text('Services')
    })
})

//HOME PAGE COMMANDS
Cypress.Commands.add('headerContentValidation',()=>{
    cy.get(homePage.headerContent).each(($el,index)=>{
        cy.wrap($el)
        .should('contain.text', header.items[index])
    })
})

Cypress.Commands.add('sideNavBarContentValidation',()=>{
    cy.get(homePage.sideNavContent).each(($el,index)=>{
        cy.wrap($el)
        .should('contain.text', navBar.items[index])
    })
})

Cypress.Commands.add('APIhomeContentValidation',()=>{
    cy.request({
        method:"GET",
        url:"https://www.phptravels.net/account/add_funds"
    }).then((res)=>{
        expect(res.status).to.equal(200)
        expect(res.headers).has.property('content-type','text/html; charset=UTF-8')
    })
})

//ADDING FUNDS COMMANDs
let amount=randomInteger(1,999999)

Cypress.Commands.add('addingFundsValidation',()=>{
    cy.get(homePage.transferInfo).then(($el)=>{
        const text =$el.text()
        let words =text.split(" ")
        let number = words[words.length - 1];
        let amount1=number.replace(',','')
        expect(Number(amount1)).to.equal(amount)
    })
})

Cypress.Commands.add('enterRandomBankAmount',()=>{
    cy.get(homePage.bankTransferCheckButton).click()
    cy.get(homePage.inputAmount).clear().type(amount)
    cy.get(homePage.payNowButton).click()
})

Cypress.Commands.add('enterRandomPaypallAmount',()=>{
    cy.get(homePage.paypalTransferCheckButton).click()
    cy.get(homePage.inputAmount).clear().type(amount)
    cy.get(homePage.payNowButton).click()
})

Cypress.Commands.add('enterRandomStripeAmount',()=>{
    cy.get(homePage.stripeTransferCheckButton).click()
    cy.get(homePage.inputAmount).clear().type(amount)
    cy.get(homePage.payNowButton).click()
})

//FLIGHT BOOKINGS COMMANDS

let minNumber=Number.MAX_VALUE;

Cypress.Commands.add('landingOnMyBookingsPage',()=>{
    cy.login(customer.email,customer.password)
    cy.url().should('contain','dashboard')
    cy.title().should('eq','Dashboard - PHPTRAVELS')
    cy.get('.sidebar-menu li a').each(($el)=>{
        const text=$el.text()
        if(text.includes('My Bookings')){
            cy.wrap($el).click()
        }
    })
})

Cypress.Commands.add('takeOffCity',()=>{
    cy.get(flightsForm.takeoff).type(takeOffDestination.search)
    cy.get(flightsForm.takeoffResult).each(($el,index,$list)=>{
        const city=$el.text()
        if(city.includes(takeOffDestination.place)){
            cy.wrap($el).click()
        }
    })
})

Cypress.Commands.add('landingCity',()=>{
    cy.get(flightsForm.landing).type(landingDestination.search)
    cy.get(flightsForm.landingResult).each(($el,index,$list)=>{
        const city=$el.text()
        if(city.includes(landingDestination.place)){
            cy.wrap($el).click()
        }
    })
})

Cypress.Commands.add('inputDate',()=>{
    cy.get(flightsForm.departureDate).clear().type('22-08-2022')
    cy.get(flightsForm.searchButton).click()
})

Cypress.Commands.add('chooseCheapestFlight',()=>{
    cy.get(flightsForm.priceList).each(($el,index,$list)=>{
        const priceText=$el.text()
        let words=priceText.split(" ");
        let word=words[words.length-1];
        let number=Number(word)
        if(minNumber > number) {
            minNumber = number;
        }
    }).then(()=>{
        let minNumStr=minNumber.toString()
        cy.get(flightsForm.priceList).contains(minNumStr).click()
    })
})

Cypress.Commands.add('validatingPriceFlight',()=>{
    cy.get(flightsForm.confirmedPrice).each(($el,index,$list)=>{
        const text=$el.text()
        if(text.includes('Total Price')){
            cy.get(flightsForm.confirmedPrice).eq(index).then((priceText)=>{
                const finalText=priceText.text()
                let words=finalText.split(" ");
                let word=words[words.length-1];
                let number=Number(word)
                expect(number).to.equal(minNumber)
            })
        }
    })
})

