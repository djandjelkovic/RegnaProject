

function countersAnimation(elementID) {
    //dodao sam parametar elementID  kako bi kreirao querySelector koji gadja elemente  pod tim id-em!
    var elements = document.querySelectorAll("#" + elementID + " #numbers .block-25 .block-100");

    for (var i = 0; i < elements.length; i++) {
        playCounters(elements[i], elements[i].innerHTML);
    }

    function playCounters(element, counterEnd) {

        var counter = 0;

        var interval = setInterval(function () {

            if (counter == 50) {
                clearInterval(interval);
                element.innerHTML = counterEnd;
            } else {
                counter++;
                element.innerHTML = counter;
            }

        }, 30)

    }

}





//f-ja za prikaz menija na mob-u
function displayMenuFromLeft() {

    
    var maskBlock = document.getElementById("mob-mask-block");
    var menuMob = document.getElementById("menu-block-mob");
    
    maskBlock.style.display = "block";
    menuMob.style.display = "block";

    
    menuMob.innerHTML = document.getElementById("menu-block").innerHTML;
    
    var counter = -100;

  
    var interval = setInterval(function () {
        
        if (counter == 0) {
            clearInterval(interval);
            document.getElementById("upBlack").style.zIndex = "0";
            document.getElementById("menu-mob-sandwich").style.display = "none";
            document.getElementById("close-mask-block").style.display = "block";
        } else {
            
            counter += 2;
            
            maskBlock.style.left = counter + "%";
            menuMob.style.left = counter + "%";
        }

    }, 10)

}

//f-ja za zatvaranje menija na mob-u
function closeMenuMob() {

    
    var maskBlock = document.getElementById("mob-mask-block");
    var menuMob = document.getElementById("menu-block-mob");
    
    var counter = 0;

    
    var interval = setInterval(function () {
        
        if (counter == -100) {
            clearInterval(interval);
            document.getElementById("upBlack").style.zIndex = "1";
            document.getElementById("menu-mob-sandwich").style.display = "block";
            document.getElementById("close-mask-block").style.display = "none";
        } else {
           
            counter -= 2;
            
            maskBlock.style.left = counter + "%";
            menuMob.style.left = counter + "%";
        }

    }, 10)

}

//f-ja za prikazivanje elementa sa strana sajta(efekat kao da element upada u sajt)
function jumpInAnimation(elementID) {
   
    //smestam u niz sve elemente koje nadje querySelectorAll
    var jumpInElements = document.querySelectorAll("#" + elementID + " .jumpIn");

    for (var i = 0; i < jumpInElements.length; i++) {
        
        jumpInElements[i].style.position = "relative";
        jumpInElements[i].style.float = "left";
    }

    
    var counter = -1;
    
    var interval = setInterval(function () {
        //ako je brojac jednak duzini niza sa elementima, prekidam interval
        if (counter >= jumpInElements.length - 1) {
            clearInterval(interval);

        } else {
            //u suprotnom povecam brojac i za svaki element u nizu pozivam funkciju
            //funkciji saljem 2 parametra, element i atribut elementa
            counter++;
            startJumpInAnimation(jumpInElements[counter], jumpInElements[counter].getAttribute("data-direction"));

        }

    }, 100)

}


function startJumpInAnimation(element, direction) {

    
    var counter = 0;

    
    counter++;
    element.style.visibility = "visible";
    
    element.style[direction] = "0";


}


document.getElementById("menu-mob-sandwich").addEventListener("click", displayMenuFromLeft);


document.getElementById("close-mask-block").addEventListener("click", closeMenuMob);

//dodajem dogadjaj na skroll
//dodajem dogadjaj scroll, na svaki skrol izvrsava se funkcija
window.addEventListener("scroll", function (ev) {
    
    var sections = document.getElementsByClassName("sectionBlock");
    
    for (var i = 0; i < sections.length; i++) {
      
        if (window.pageYOffset > 100) {
            document.getElementById("upBlack").style.backgroundColor = "rgba(52, 59, 64, 0.9)";
            document.getElementById("upBlack").style.padding = "0";
            document.getElementById("upBlack").style.position = "fixed";
        } else {
            document.getElementById("upBlack").style.backgroundColor = "transparent";
            document.getElementById("upBlack").style.padding = "10px";
        }

        /*
        u ovom trenutku detektujem da li je trenutni skrol blizu diva kroz koji prolazim sa for petljom
          */
        if (window.pageYOffset >= sections[i].offsetTop - 500) {

            sections[i].style.opacity = "1";
            
            jumpInAnimation(sections[i].getAttribute("id"));
           
            countersAnimation(sections[i].getAttribute("id"));
           
            sections[i].classList.remove("sectionBlock");


        } else {
            //jumpOutElements(sections[i].getAttribute("id"));

        }
    }

})


tabItemsShow()

function tabItemsShow() {

    var tabs = document.getElementsByClassName("itemsShowClick");

    for(var i=0;i<tabs.length;i++){
        tabs[i].addEventListener("click", function (e) {
            
            e.preventDefault();
            
            hideItems();
            
            if(e.target.getAttribute("data-items") == "all"){
                var itemsToShow = document.getElementsByClassName("items"); 
            }else{
                var itemsToShow = document.getElementsByClassName(e.target.getAttribute("data-items")); // spajaju se preko klase i data-item atribut koji im je naziv zanr, i dodata je i klasa naziv zanra
            }
            

            for(var j=0;j<itemsToShow.length;j++){
                displayTabItems(itemsToShow[j],"block")
                itemsToShow[j].style.opacity = "1";
            }

        })
    }

}

function hideItems() {

    var items = document.getElementsByClassName("items");
    for(var i = 0;i<items.length;i++){
        items[i].style.opacity = "0";
        displayTabItems(items[i],"none");
    }

}


function displayTabItems(e,status){
    setTimeout(function(){e.style.display = status;},500)
}