$(document).ready(function () {
  let charCounter = $('textarea');
  
  charCounter.keyup(function () {
    let tweetLength = charCounter.val().length;
    // console.log(charCounter.val().length);
    $('.counter').text((140 - tweetLength));
    // console.log($('.counter').text());

    if ( tweetLength > 140 ) {
      $('.counter').addClass("red");
    } else {
      $('.counter').removeClass("red");
    }
  });

});

