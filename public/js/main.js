var source = document.querySelector('#source');
var output = document.querySelector('#output');
var sw1 = document.getElementById('sw1-p');
var sw2 =  document.getElementById('sw2-p');
var lanSwitch = document.querySelector('#switch');

// Tab selection
$('#myTabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

// active classes for tabs
$('#numbers-tab').addClass('active');
$('.tab-pane:first-child').addClass('active');

// sets language for text
var language = 'Polish';

// sets flags
if (window.location.href.indexOf("norwegian") > -1) {
  $('.flag').attr('src', '/images/norway.png');
  language = 'Norwegian';
}

// shows tabs from url
$(function () {
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab('show');
});

// sets language for api
var langAPI;

function langSwitch() {
  if (lanSwitch.getAttribute("attr") == 'Polish') {
    langAPI = 'pl';
  }
  else {
    langAPI = 'no';
  }
}
langSwitch();


// switches language
lanSwitch.addEventListener('click', function () {
  if (langAPI !== 'en') {
    langAPI = 'en';

    sw1.innerHTML = language;
    sw2.innerHTML = 'English';
    source.value = '';
    output.innerHTML = '';
    source.placeholder = 'Type ' + language + ' here';
    output.placeholder = 'Type English here';

  }
  else {
    langAPI = lanSwitch.getAttribute("attr");
    langSwitch();
    
    sw1.innerHTML = 'English';
    sw2.innerHTML = language;
    source.value = '';
    output.innerHTML = '';
    source.placeholder = 'Type English here';
    output.placeholder = 'Type ' + language + ' here';
  }
});

var url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
var keyAPI = "trnsl.1.1.20171120T151319Z.884ad4768789b517.9e6db12a8ca198a2c0d93af1d8be54ee1669bf07";

document.querySelector('#source').addEventListener('keyup', function () {
  var xhr = new XMLHttpRequest();
  var textAPI = document.querySelector('#source').value;
  var data = "key=" + keyAPI + "&text=" + textAPI + "&lang=" + langAPI;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      var json = JSON.parse(res);
      if (json.code == 200) {
        output.innerHTML = json.text[0];
      }
      else {
        output.innerHTML = "Error Code: " + json.code;
      }
    }
  };
}, false);
