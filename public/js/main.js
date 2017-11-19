$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});

if (window.location.href.indexOf("norwegian") > -1) {
     $('.flag').attr('src', '/images/norway.png');
}