    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB-fj62WgmDC0p7BWTy90sVlroMu9syy2k",
        authDomain: "fir-fast-start.firebaseapp.com",
        databaseURL: "https://fir-fast-start.firebaseio.com",
        projectId: "fir-fast-start",
        storageBucket: "fir-fast-start.appspot.com",
        messagingSenderId: "926723473603"
    };
    //initializa o firebase com as configuracoes do projeto definidas na variavel config
    //para utilizar o firebase, eh necessário ter um projeto cadastrado no console do firebase acessivel por: (https://console.firebase.google.com/)
    firebase.initializeApp(config);
    var liAppDescription = document.getElementById('app-description');
    var h3Users = document.getElementById('users');
    //pega a instancia do realtime database
    var firebaseDB = firebase.database();
    //pega uma referencia ao caminho /users
    //essa referencia pode ser usada para operacaoes de crud neste objeto
    var usuariosDB = firebaseDB.ref().child('users');
    //pega um json criado manualmente para fazer carga no banco a partir dele
    var usersdata = JSON.parse(data);
    var usuarioID = 1;
    //percorre os usurios salvos no json e adiciona eles no realtime database do firebase atraves do metodo set
    for(usuarioID in usersdata){
        usuario = usersdata[usuarioID];
        firebaseDB.ref('users/' + usuarioID).set({
            username: usuario.name,
            email: usuario.email
            //profile_picture : imageUrl
        });
        usuarioID++;
    }

    
    //Metodo ON eh chamado sempre que os dados sao alterados no banco
    //Fazendo consulta simples atraves do metodo ON
    usuariosDB.on('value', changeFunction => {
        var users = changeFunction.val();
        for(userId in users){
            var user = users[userId];
            h3Users.innerHTML += user.username+'<br>';
        }
    });


    var h3UsersPaginados = document.getElementById('users-paginados');
    //criando a query para paginar
    var query = usuariosDB.orderByKey().limitToFirst(3);
    //filtrando primeiros tres registros ordenados por chave
    query.on('value', changeFunction => {
        var users = changeFunction.val();
        for(userId in users){
            var user = users[userId];
            h3UsersPaginados.innerHTML += user.username+'<br>';
        }
    });

    var h3UsersPaginadosOrdenadoPorNome = document.getElementById('users-por-nome-paginados');
    var queryOrdenadaPorNomes = usuariosDB.orderByChild('username').startAt('').limitToFirst(3);
    //filtrando primeiros 3 registros em ordem alfabetica
    queryOrdenadaPorNomes.on('value', changeFunction => {
        var users = changeFunction.val();
        console.log(users);
        //retorno da funcao eh em ordem de codigo, assim, eh preciso ordenar os dados para mostra na tela em ordem alfabetica
        users.sort(function(a,b) {
            return a.username < b.username ? -1 : a.username > b.username ? 1 : 0;
        });
        for(userId in users){
            var user = users[userId];
            h3UsersPaginadosOrdenadoPorNome.innerHTML += user.username+'<br>';
        }
    });
    //cria referencia ao objeto text, um objeto padrao para trazer a descricao do site
    var textDB = firebase.database().ref().child('text');
    textDB.on('value', changeFunction => {
        liAppDescription.innerText = changeFunction.val();
    });
    

