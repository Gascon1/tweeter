/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


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


const createTweetElement = function (tweet) {
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
  let $main = $('<main>').text(tweet.content.text);
  $tweet.append($main);

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
  for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet); 
    }
  }
  
  
  $(document).ready(function () {
    renderTweets(data);
});