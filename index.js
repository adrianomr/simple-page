    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB-fj62WgmDC0p7BWTy90sVlroMu9syy2k",
        authDomain: "fir-fast-start.firebaseapp.com",
        databaseURL: "https://fir-fast-start.firebaseio.com",
        projectId: "fir-fast-start",
        storageBucket: "fir-fast-start.appspot.com",
        messagingSenderId: "926723473603"
    };
    firebase.initializeApp(config);
    var liAppDescription = document.getElementById('app-description');
    var h3Users = document.getElementById('users');
    var firebaseDB = firebase.database().ref().child('users');
    var usersdata = JSON.parse(data);

    var usuarioID = 1;
    console.log(usersdata);
    for(usuarioID in usersdata){
        usuario = usersdata[usuarioID];
        firebase.database().ref('users/' + usuarioID).set({
            username: usuario.name,
            email: usuario.email
            //profile_picture : imageUrl
        });
        usuarioID++;
    }
    firebaseDB.on('value', changeFunction => {
        //liAppDescription.innerText = changeFunction.val();
        var users = changeFunction.val();
        for(userId in users){
            var user = users[userId];
            console.log(user);
            h3Users.innerHTML += user.username+'<br>';
        }
        console.log(changeFunction.val());
    });
    firebaseDB = firebase.database().ref().child('text');
    firebaseDB.on('value', changeFunction => {
        liAppDescription.innerText = changeFunction.val();
        console.log(changeFunction.val());
    });
    

