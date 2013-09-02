// ==UserScript==
// @name        CookieClicker Clicker
// @description Clicks everything for you when playing CookieClicker
// @namespace   http://nijotz.com
// @version     1.0
// @include     http://orteil.dashnet.org/cookieclicker/
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


// Click as fast as possible without taking down the browser
var bigcookie_on = 0;
bigcookie = $('#bigCookie');
function bigcookie_clicker() {
    if (!bigcookie_on) {return}
    bigcookie.click();
    setTimeout(bigcookie_clicker, 1);
}

// Once a second for upgrades, products, etc
var other_on = 0;
// off for now until I code a way to avoid the Grandmapocalypse
//selectors = ['.update.enabled', '.product.enabled', '#goldenCookie'];
selectors = ['.product.enabled', '#goldenCookie'];
function other_clicker() {
    if (!other_on) {return}
    for (i in selectors) {
        var selector = selectors[i];
        if ($(selector)) { $(selector).click() }
    };
    setTimeout(other_clicker, 1000)
}

//Add checkboxes to toggle the clicking
$('body').append(
    ['<div id="cheatInputs">',
     '<label for="bigcookie_checkbox">Big Cookie</label>',
     '<input type="checkbox" id="bigcookie_checkbox"/>',
     '<label for="other_checkbox">Everything Else</label>',
     '<input type="checkbox" id="other_checkbox"/>',
     '</div>'].join('\n')
);

// Toggle functions
function toggle_bigcookie_clicker() {
    if ($(this).is(':checked')) {
        bigcookie_on = 1;
        bigcookie_clicker();
    } else {
        bigcookie_on = 0;
    }
}

function toggle_other_clicker() {
    if ($(this).is(':checked')) {
        other_on = 1;
        other_clicker();
    } else {
        other_on = 0;
    }
}

$('#bigcookie_checkbox').change(toggle_bigcookie_clicker);
$('#other_checkbox').change(toggle_other_clicker);

// Style to put checkboxes in top left corner
GM_addStyle('#cheatInputs { position: fixed; top: 20px; left: 0px; }');
