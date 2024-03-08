/*
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('buscar').addEventListener('click', function(){
        const xhttp = new XMLHttpRequest();
        const name = document.getElementById('nome').value;
        const endpoint = `https://api.github.com/users/${name}`;

        xhttp.open('GET', endpoint);
        xhttp.send();
    })
})
*/
$(document).ready(function(){

    $('#buscar').click(function(){
        const Nome = $('#nome').val();
        const endpoint = `https://api.github.com/users/${Nome}`;
        const btn = $(this);
        const nameElement = $('#name');
        const usernameElement = $('#username');
        const avatarElement = $('#avatar');
        const reposElement = $('#repos');
        const followersElement = $('#followers');
        const followingElement = $('#following');
        const linkElement = $('#link');
        
        $(btn).find('i').addClass('d-none');
        $(btn).find('span').removeClass('d-none');
/*
        outro modo de fazer.
        $.ajax(endpoint)
        .done(function(resposta){
            nameElement.text(resposta.name);
            usernameElement.text(resposta.login);
            avatarElement.attr('src', resposta.avatar_url);
            followingElement.text(resposta.following);
            followersElement.text(resposta.followers);
            reposElement.text(resposta.public_repos);
            linkElement.attr('href', resposta.html_url);

        })
        .fail(function() {
            alert("Ocorreu um erro, utilizador não existe, tente novamente.");
        })
        .always(function(){
            setTimeout(function(){
                $(btn).find('i').removeClass('d-none');
                $(btn).find('span').addClass('d-none');
            }, 1000);
            $('#nome').val('');
        })

        $('#formulario-nome').submit(function(evento){
        evento.preventDefault();

        if($('#nome').val().length == 0) {
            alert("Digite um nome de usuário do GitHub.");
            throw new Error('Digite o nome');
        }
    });
*/         
        //.catch funciona neste caso com o metodo HEAD, sem ele o .catch não é exibido, demorei até encontrar a solução.
        fetch(endpoint, { method: 'HEAD' })
            .then(function(verificar) {
                if (!verificar.ok) {
                    throw new Error('O utilizador não existe. Por favor, insira um nome de utilizador válido.');
                }
                return fetch(endpoint);
            })
            .then(function(resposta){
                return resposta.json();
            })
            .then(function(json){
                nameElement.text(json.name);
                usernameElement.text(json.login);
                avatarElement.attr('src', json.avatar_url);
                followingElement.text(json.following);
                followersElement.text(json.followers);
                reposElement.text(json.public_repos);
                linkElement.attr('href', json.html_url);
            })
            .catch(function(erro){
                alert("Ocorreu um erro, utilizador não existe, tente novamente.");
                console.log(erro);
            })
            .finally(function(){
                setTimeout(function(){
                    $(btn).find('i').removeClass('d-none');
                    $(btn).find('span').addClass('d-none');
                }, 1000);
                $('#nome').val('');
            });
    });

/*
    não preciso, já que o metodo HEAD, verifica se o campo foi preenchido devidamente ou não.
    $('#formulario-nome').submit(function(evento){
        evento.preventDefault();

        if($('#nome').val().length == 0) {
            throw new Error('Digite o nome');
        }
    });
*/

});