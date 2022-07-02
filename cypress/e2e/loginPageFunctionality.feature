Feature: Login Page functionality test

    Testing the functionality of Login Page

    Background: Landing on the home page
    Given I am on the Home Page

    Scenario: I want to check customer login with empty email and password
    When I click on Login button
    Then proper error message should appear

    Scenario: I want to check customer login with valid email and invalid password
    When I enter valid email and invalid password click on Login button
    Then wrong password error message should appear

    Scenario: I want to check customer login with invalid email and valid password
    When I enter invalid email and valid password click on Login button
    Then wrong email error message should appear

    Scenario: I want to check customer login with valid credentials
    When I enter valid customer credentials and click on Login button
    Then I land on the home page as customer

    Scenario: I want to check agent login with valid credentials
    When I enter valid agent credentials and click on Login button
    Then I land on the home page as agent



