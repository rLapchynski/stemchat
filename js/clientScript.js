$(document).ready(function(){
        var socket = io.connect();

        $("#msgBoxIcon").hover(
               function () {
                  $(this).val('settings');
               },

               function () {
                  $(this).val('play_arrow');
               }
            );


        $("#message").keyup(function(event){
                //Send contents of messaage box and clear it when enter is pressed.
                if(event.keyCode == 13){
                        socket.emit('msg', {"user": user, "message":$("#message").val()});
                        socket.emit('liveType', {"username": user.local.username, "content":""});
                        $("#message").val("");
                } else {
                        socket.emit('liveType', {"username": user.local.username, "content":$("#message").val()});
                }
        });

        socket.on('liveType', function(data){
                var spinner='<div class="preloader-wrapper small active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>'
                if($("#liveTypeCard_" + data.username).length){
                        $("#liveTypeSpan_" + data.username).text(data.content);
                } else {
                        $("#liveTypeRow").prepend('<div class="card-panel grey lighten-1" id="liveTypeCard_' + data.username + '"><span class="valign">' + data.username + ': </span><span id="liveTypeSpan_' + data.username + '">' + data.content + '</span></div>');
                }
                if(data.content == ""){
                        $("#liveTypeCard_" + data.username).remove();
                }
        });

        socket.on('connect', function() {

        });

        socket.on('msg', function(msg){
                Materialize.toast('<span><b>' + msg.user.local.username + ": " + '</b>' + msg.message + '</span>', 2500);
                $('#main_table tr:first').before('<tr></tr>');
                $('#main_table tr:first').load('/messagetemplate.html', function(data){
                        $('#username_label:first').html('<span class="left-align">' + msg.user.local.username + '</span>');
                        $('#message_text:first').html('<span>' + msg.message + '</span>');
                });

        });

        socket.on('cmd', function(cmd){
        });
});
