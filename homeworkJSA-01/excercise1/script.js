$(document).ready(function() {
    $("#myBtn").click(function() {
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon",
            success: function(response) {
                console.log(response);
                for (let i = 0; i <=9; i++) {
                    let pokemon = response.results[i];
                    $("#myList").append(`<li>${pokemon.name}</li>`);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});