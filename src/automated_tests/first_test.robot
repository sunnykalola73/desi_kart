*** Settings ***
Library           SeleniumLibrary
Suite Setup       Load Website in Browser     
Suite Teardown    Close Browser

*** Test Cases ***
Verify that the DesiKart website loads successfully
    Element Should Be Visible    id:all-things-desi-image   Error: not visible.
    Sleep    5 seconds
    Log    Do test with same session cookies.

*** Keywords ***
Load Website in Browser
    Open Browser    https://www.google.com/    Chrome
    Go To    http://localhost:3000/
