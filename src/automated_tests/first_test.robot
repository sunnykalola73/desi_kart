*** Settings ***
Library           SeleniumLibrary
Suite Setup       Open Browser    https://www.google.com/    Chrome     
Suite Teardown    Close Browser

*** Test Cases ***
Verify that the DesiKart website loads successfully
    Go To    http://localhost:3000/
    
    Sleep    5 seconds
    Log    Do test with same session cookies.