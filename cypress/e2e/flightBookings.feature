Feature: Flight booking functionality validation

    Testing the flight booking functionality and layout

    Background:  Background: Landing on the home page with customer credentials
    Given I am on the Home Page My Bookings
    When I click on the Flight button

    Scenario: Checking the flight booking functionality
    And Enter flight information, and click Search button
    And Choose the cheapest flight 
    And Confirm the Booking with Bank transfer paying
    Then My booking on the Invoice Page should contain the selected flight amount

    Scenario: Checking the layout of the flight booking page
    Then I want to check elements on the flight page