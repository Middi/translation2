$('#myTabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('ul.nav.nav-tabs li:first-child').addClass('active');


$('.tab-pane:first-child').addClass('active');


if (window.location.href.indexOf("norwegian") > -1) {
     $('.flag').attr('src', '/images/norway.png');
}




$(function(){
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab('show');

  $('.nav-tabs a').click(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop() || $('html').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });
});