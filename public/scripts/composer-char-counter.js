
$(document).ready(function () {
  let charCounter = $('textarea');
  /**
 * making the counter decrement based 
 * on the length of the textarea
 */
  charCounter.keyup(function () {
    let tweetLength = charCounter.val().length;
    $(this).parent().find('.counter').text((140 - tweetLength));

    if (tweetLength > 140) {
      $(this).parent().find('.counter').addClass("red");
    } else {
      $(this).parent().find('.counter').removeClass("red");
    }
  });

});

