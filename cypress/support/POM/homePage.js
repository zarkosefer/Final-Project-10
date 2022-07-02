const homePage={
    welcome:'.section-heading h2 span',
    sideNavContent:'.sidebar-menu-wrap ul li a:visible',
    headerContent:'.main-menu-content nav ul li:visible',
    bodyContent:'div[class="d-flex"]',
    searchText:'.title',
    searchButton:'.form-title-wrap > .d-flex > .icon-element > .la',
    flightsButton:'a[href="https://www.phptravels.net/flights"]',

    addFundsButton:'.user_wallet > .waves-effect',
    bankTransferCheckButton:'#gateway_bank-transfer',
    paypalTransferCheckButton:'#gateway_paypal',
    stripeTransferCheckButton:'#gateway_stripe',
    inputAmount:'.form-group input[type="number"]',
    payNowButton:'.col-md-12 button',
    transferInfo:'.card-header small strong',

    errorMessage1:'.animated.fadeInDown strong',
    errorMessage2:'p.animated',
    brokenAppTitle:'.exc-title span',
    brokenAppMessage:'.exception .exc-message'
}

function randomInteger(min, max){
    return Math.floor(Math.random()*(max-min+1))+min
}

export {homePage, randomInteger}