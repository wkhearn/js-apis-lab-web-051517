var createGist = function(file_name, content, description, token){
  var newGist = {
    "description": description,
    "public": true,
    "files": {
      file_name: {
        "content": content
      }
    }
  }

  $.ajax({
    url: "https://api.github.com/gists",
    method: "POST",
    data: JSON.stringify(newGist),
    headers: {
      "Authorization": `token ` + token
    },
    success: function(data) {
      debugger
      myGists(data.owner.login, token)
    }
  })
}

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    method: "GET",
    headers: {
      "Authorization": `token ` + token
    },
    success: function(data) {
      $('#myGists').html('');
      data.forEach(function(gist){
        $("#myGists").append(`<li>${gist.description}</li>`)
      })
    }
  })
}

var bindCreateButton = function(event) {
  $('#create').on("click", function(){
    let token = $("#token").val()
    let file_name = $("#file_name").val()
    let content = $("#content").val()
    let description = $("#description").val()

    createGist(file_name, content, description, token)
  })
}

$(document).ready(function(){
  bindCreateButton()
})
