const firebaseConfig = {
    apiKey: "AIzaSyA3tEMTak2oxLLVvQuHpNO3CYE0IO3CKnk",
    authDomain: "starre-ea41a.firebaseapp.com",
    projectId: "starre-ea41a",
    storageBucket: "starre-ea41a.appspot.com",
    messagingSenderId: "530981906825",
    appId: "1:530981906825:web:894a88bb6f7256e3645958"
  };

firebase.initializeApp(firebaseConfig);
	user_name = localStorage.getItem("user_name");
	room_name = localStorage.getItem("room_name");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Iniciar código
         console.log(firebase_message_id);
	       console.log(message_data);
	       name = message_data['name'];
	       message = message_data['message'];
         like = message_data['like'];
         name_with_tag = "<h4> "+ name +"</h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>Curtidas: "+ like +"</button>";

        row = name_with_tag + message_with_tag +like_button;       
        document.getElementById("output").innerHTML += row;
//Finalizar código
      } });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicou no botão Curtidas - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(message_id).update({
		like : updated_likes  
	 });

}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}