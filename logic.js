$(document).ready(function(){
  var $body = $('.tweets');
  $body.html('');
  var index = 0;
  var home = streams.home;

  tweetRefresh();

  function tweetRefresh() {
    while(index < home.length){
     var tweet = home[index];
     var $tweet = $('<div class="tweet"></div>');
     var $createdAt = $('<div class="created-at"></div> </br>');
     var $user = $('<a href="#" class="user"></a> </br>');

     $user.text(tweet.user);
     $createdAt.text('  - ' + tweet.created_at);
     $tweet.text(tweet.message);

     $user.prependTo($tweet).attr('data-target', '#user-modal').attr('data-toggle', 'modal');
     $createdAt.appendTo($tweet);
     $tweet.prependTo($body);

     // Individual tweets per user (click).
     $user.on("click", function(){
      var currentUser = $(this).text();
      console.log(currentUser);
      var currentUserTweets = streams.users[currentUser];
      console.log(currentUserTweets);

      function userItems() {
        var emptyArr = [];
          for (var x in currentUserTweets) {
            emptyArr.push(currentUserTweets[x]['message'] + "</br>" + currentUserTweets[x]['created_at'] + "</br></br></br>");
          }
          return emptyArr.join(" ");
      }

      function currentUserTweetsTrigger() {
        while(index < currentUserTweets.length) {
          var $tweet = $('<div class="tweet"></div>');
          var $createdAt = $('<div class="created-at"></div> </br>');
          var $user = $('<a href="#" class="user"></a> </br>');
        }
      }
      var userTweetsModal = '<div class="modal fade" id="user-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel"> @' + currentUser + '\'s yodles</h4></div><div class="modal-body">' + userItems() + 
                    '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>';
        $body.append(userTweetsModal);
     });
     index++;
    }
     // Triggers tweetRefresh every X milliseconds.
     setInterval(tweetRefresh, 20000);

  }

  // Sets height for sidebar to window size.

  var $winHeight = $(window).height();
  $('.sidebar').css('height', $winHeight);
  $('.user-modal').css('height', $winHeight);

});
