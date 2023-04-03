*** Settings ***
Library           SeleniumLibrary
Suite Setup       Load Website in Browser     
Suite Teardown    Close Browser

*** Test Cases ***
Verify that the DesiKart website loads successfully.
    Sleep    2 seconds
    Element Should Be Visible    id:all-things-desi-image   Error: not visible.
    Log    Website loads successfully.

Verify that the Home page has Login button.
    Wait Until Page Contains    Login
    Log   Home page has Login button.

Verify that the Home page footer has the DesiKart logo.
    Execute JavaScript    window.scrollTo(0, document.body.scrollHeight)
    Sleep    2 seconds
    Element Should Be Visible    id:Logo
    Log    Home page footer has the DesiKart logo.
    
Verify that the Login button works well.
    Execute JavaScript    window.scrollTo(0, 0)
    Sleep    2 seconds
    Click Element    id:login-link
    Sleep    2 seconds
    Log    Login button is clickable.

Verify that the user is able to register successfully.
    Click Element    id:signup
    Sleep    2 seconds
    Input Text    id:firstname    John
    Input Text    id:lastname    Doe
    Input Text    id:emailID    johndoe1@gmail.com
    Input Text    id:enter-password    John@123
    Input Text    id:confirm-password    John@123
    Input Text    id:mobile-number    5481234567
    Input Text    id:address-line1    Unit A, 221 Hickory st
    Input Text    id:address-line2    Near Northfield station
    Input Text    id:city-name    Waterloo
    Input Text    id:province-name    Ontario
    Input Text    id:country-name    Canada
    Input Text    id:postal-code     N2L3W3
    Sleep    2 seconds
    Execute JavaScript    window.scrollTo(0, document.body.scrollHeight)
    Click Button    id:create-account
    Log    User is able to register successfully.

*** Keywords ***
Load Website in Browser
    Open Browser    http://localhost:3000/    Chrome
    Maximize Browser Window
