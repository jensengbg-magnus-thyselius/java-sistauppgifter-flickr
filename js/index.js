//Skapande av url med tag, antal och apinyckel, som sedan kör fetch. När fetch körts (getPictures) så kör den funktionen Get.
//Därefter skapar den img src för respektive antal bilder som hämtats och skriver ut dem i innerHTML som en grid av bilder.

async function getPictures(tag, apiKey, pAmount) {
    const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+apiKey+'&tags='+tag+'&per_page='+pAmount+'&sort=interestingness-desc&media=photos&format=json&nojsoncallback=1';
    let response = await fetch(url, { method: 'GET' });
    return response.json();
}

let pGrid = ''

async function get() {
    const apiKey = '19d3e6e0acfe9c438f368e2c2bab1c5d'
    const ptag = document.getElementById("inputData").value;
    const pAmount = document.getElementById("inputAmount").value;
    const pGrid = document.getElementById("listPics");
    
pGrid.innerHTML = ''

    let pObject = await getPictures(ptag, apiKey, pAmount);

    console.log(pObject)

let html = ''

    pObject.photos.photo.forEach(photo=>{
    html+='<img src="https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_c.jpg" class="picture">';
    
    })

pGrid.innerHTML = html

//lightbox.
//gör om picture-objectet till en array, för att sedan kunna lägga till eventlistener på respektive item i arrayen.

var pArray = document.getElementsByClassName("picture");
for (var i = 0; i < pArray.length; i++) {
    pArray[i].addEventListener("click", function(event) {
        document.getElementById("lightbox").className = "open";
        document.getElementById("lightbox_picture").src = event.target.src
    });    
 }
}
  
  document.getElementById("close").addEventListener("click", function() {
    document.getElementById("lightbox").className = "";
  });
  
  document.getElementById("lightbox").addEventListener("click", function(e) {
    if (e.target.id == "lightbox") {
      document.getElementById("lightbox").className = "";
    }
    
  });

//så jag kan klicka på enter efter jag sökt, så har jag lagt sökfält och sökknapp i ett form istället. Och inväntar en submit på formet, 
//som då inte kör default utan istället kör get-funktionen.

  document.getElementById("searchform").addEventListener("submit", function(event) {
    event.preventDefault();
    get()
  });


