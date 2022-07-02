Feature: Home Page functionality test

    testing functionality of the Home Page

    Background: Landing on the home page with customer credentials
    Given I am on the Home Page
    When I click on the Add funds button

    Scenario: Testing the adding fund functionality via Bank
    And I select bank radio button, enter amount and click on pay now button
    Then Amount on the bank payment slip should equal the amount entered on the Home Page
    
    Scenario: Testing the adding fund functionality via Paypall
    And I select paypall radio button, enter amount and click on pay now button
    Then Amount on the paypal payment slip should equal the amount entered on the Home Page

    Scenario: Testing the adding fund functionality via Stripe
    And I select stripe radio button, enter amount and click on pay now button
    Then Error message gets shown on the screen

    Scenario: Testing adding fund functionality with empty input field
    And I select bank radio button, clear amount field and click on pay now button
    Then Application crashes and i get error messages


