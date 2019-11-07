/**function for time ago on tweets*/
function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

/**function to make a tweet*/
const createTweetElement = function (tweet) {
  // header
  let $tweet = $('<article>').addClass('tweet');
  let $header = $('<header>').addClass('container container-name');
  let $div = $('<div>').addClass('container-name');
  let $profilePic = $('<img>').attr("src", tweet.user.avatars);
  $div.append($profilePic);
  let $span = $('<span>').text(tweet.user.name).addClass('name');
  $div.append($span);
  $header.append($div);
  let handle = $('<span>').text(tweet.user.handle).addClass('handle');
  $header.append(handle);
  $tweet.append($header);

  //content
  let $main = $('<main>').text(tweet.content.text);
  $tweet.append($main);

  //footer
  let date = new Date(tweet.created_at);
  let timeElapsed = timeSince(date);
  let $footer = $('<footer>').addClass('container')
  let $timeSince = $('<span>').text(`${timeElapsed} ago`);
  $footer.append($timeSince);
  let $icons = $('<span>')
  let $i2 = $('<i>').addClass('fas fa-flag reaction');
  $icons.append($i2);
  let $i = $('<i>').addClass('fas fa-retweet reaction');
  $icons.append($i);
  let $i3 = $('<i>').addClass('fas fa-heart reaction');
  $icons.append($i3);
  $footer.append($icons);
  $tweet.append($footer);
  return $tweet;
}

/** function to render the tweets 
 * from the loaded tweets via callback
 */
const renderTweets = function (tweets) {
  tweets.reverse();
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

/**function to load tweets via 
 * get method and ajax
 */
const loadTweets = function () {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/tweets"
  })
    .done(renderTweets)
}

/**
 * initial load of all the tweets, so
 * that when a user loads the page,
 * all the already existing tweets are loaded.
 */
$(document).ready(function () {
  loadTweets();
})

/** When the Tweet button is pressed
 * to post a new tweet, the default behavior
 * of the submit button is prevented and instead 
 * replaced by ajax. The sliding effect and the errors
 * are also handled in here.
 */
$(document).ready(function () {
  const $form = $('form');
  $form.on('submit', function (event) {
    event.preventDefault();
    if ($('#charCounter').val() === "") {
      $('#if-is-too-long').slideUp(0)
      $('#if-is-empty').slideDown()
      return;
    } else if ($('#charCounter').val().length > 140) {
      $('#if-is-empty').slideUp(0)
      $('#if-is-too-long').slideDown()
      return;
    } else {
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets/",
        data: $(this).serialize()
      })
        .done(function () {
          $('#charCounter').val('');
          $('.counter').text(140);
          $('#if-is-empty').slideUp()
          $('#if-is-too-long').slideUp()
          loadTweets();
        })
    }
  })
});

/**toggling the new tweet section */
$(document).ready(function () {
  const $btn = $('#compose')
  const $newTweet = $('.new-tweet')

  $btn.on('click', function () {
    $newTweet.slideToggle(300, function () {
      $('textarea').focus();
    });
  })
})

/**
 * #Stretch# button to scroll up 
 * only appears when a user has scrolled 
 * more than 570px
 */
$(document).ready(function () {
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 570) {  
        $('.return-to-top').fadeIn(50);    // Fade in the arrow
    } else {
        $('.return-to-top').fadeOut(50);   // Else fade out the arrow
    }
  });
  $('.return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
    $("textarea").focus();
  });
  })
