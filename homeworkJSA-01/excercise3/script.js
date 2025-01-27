let imageContainer = document.getElementById("imageContainer")

fetch("https://dog.ceo/api/breed/hound/images")
.then(function(response){
    response.json()
    .then(function(data){
        for(let object of data.message){
            let img = document.createElement("img");
            img.src = object;
            img.alt = "Hound Image"
            imageContainer.appendChild(img);
        }
    })
    .catch(function(parsedError){
        console.log(parsedError);
    })
})
.catch(function(error){
    console.log(error);
})