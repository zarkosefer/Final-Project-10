Feature: Validating the layout and elements on the Home Page

    Testing the layout of the Home Page

    Background: Landing on the home page with customer credentials
    Given I am on the Home Page

    Scenario: I want to check header content
    When I check the header contents length of Home Page
    Then I want to see following elements on Home Page header

    Scenario: I want to check sidenav content
    When I check the sidenav contents length of Home Page
    Then I want to see following elements on Home Page sidenav

    Scenario: I want to check body content
    When I check the body content of Home Page
    Then I want to see following elements on Home Page body