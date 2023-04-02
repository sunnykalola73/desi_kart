*** Settings ***
Library           SeleniumLibrary
Suite Setup       Load Website in Browser     

*** Test Cases ***
Verify if user is able to login successfully.
    Sleep    2 seconds
    Click Element    id:login-link
    Sleep    2 seconds
    Input Text    id:login-email    rgediya001@gmail.com
    Input Text    id:login-password    Rashmi@123
    Click Button    id:login-button
    Wait Until Page Contains Element    id:logout-link
    Sleep    5 seconds       

Verify if user is able to logout successfully.
    Click Element    id:logout-link
    Wait Until Page Contains Element   id:login-link 
    

*** Keywords ***
Load Website in Browser
    Open Browser    http://localhost:3000/    Chrome
    Maximize Browser Window