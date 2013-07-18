// ==UserScript==
// @name        Artifcatory Age to Date
// @description When viewing an item in artifactory, addes creation date next to age
// @namespace   http://nijotz.com
// @version     1.0
// @include     http://repository-prod.thetuscorp.com/*
// @grant       none
// ==/UserScript==


// Google Chrome supports Greasemonkey scripts, but doesn't support @require and I need/want jQuery
// From: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function main() {

  function modify_age_html(element) {

    // Age element
    element = jQ('div.labeled-value > span:contains(Age:)').siblings()

    // If the element isn't on the page, gtfo
    if (!element || !element.html()) return

    // If it already has a date, leave it
    if (element.html().indexOf('[') >= 0) return

    var age_str = element.html();

    unit_multipliers = {
        'd': 86400,
        'h': 3600,
        'm': 60,
        's': 1
    };

    age = 0;

    // Calculate age in seconds
    chunks = age_str.split(' ');
    for (chunk in chunks) {
        chunk = chunks[chunk];
        num = parseInt(chunk.slice(0,-1));
        unit = chunk.slice(-1);
        age += (num * unit_multipliers[unit]);
    }

    // Calculate and place date of item
    now = new Date().getTime();
    element.html(age_str + ' [' + new Date(now - (age * 1000)) + ']');
  }

  // Whenever there's a click, see if there's an age to update
  // I tried .on("remove" and "change", but that didn't work
  jQ(document).on("click", function() {
    console.log('adding date');
    setTimeout(function(){modify_age_html()}, 150);
  });

  modify_age_html();
}

addJQuery(main);
