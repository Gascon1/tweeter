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
  let $sneakySpan = $('<span>').text(tweet.user.handle).addClass('handle');
  $header.append($sneakySpan);
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
  let $i2 = $('<i>').addClass('fas fa-flag');
  $icons.append($i2);
  let $i = $('<i>').addClass('fas fa-retweet');
  $icons.append($i);
  let $i3 = $('<i>').addClass('fas fa-heart');
  $icons.append($i3);
  $footer.append($icons);
  $tweet.append($footer);
  return $tweet;
}

const renderTweets = function (tweets) {
  tweets.reverse();
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}


const loadTweets = function () {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/tweets"
  })
    .done(renderTweets)
}



$(document).ready(function () {
  const $form = $('form');
  $form.on('submit', function (event) {
    event.preventDefault();
    if ($('#charCounter').val() === "") {
      alert("I know this app is great and all, but please write something before attempting to post!")
      return;
    } else if ($('#charCounter').val().length > 140) {
      alert("I see you're getting a little excited, please limit yourself to 140 characters!")
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
          loadTweets();
        })
    }
  })
});
