$(document).ready(function () {
  let charCounter = $('textarea');
  
  charCounter.keyup(function () {
    let tweetLength = charCounter.val().length;
    // console.log(charCounter.val().length);
    $(this).parent().find('.counter').text((140 - tweetLength));
    // console.log($(this).parent().find('.counter').text());

    if ( tweetLength > 140 ) {
      $(this).parent().find('.counter').addClass("red");
    } else {
      $(this).parent().find('.counter').removeClass("red");
    }
  });

});

