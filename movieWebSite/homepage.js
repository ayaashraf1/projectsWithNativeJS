function changeLanguage(){
    var selectedlang = document.getElementById("languages").value;
    var bodyElement = document.getElementById("body");
    var arabicDataElements = document.getElementsByClassName("arabic-lang-data");
    var englishDataElements = document.getElementsByClassName("Eng-lang-data");
    if (selectedlang === 'English') {
        document.getElementById("languages").value = "English";
        bodyElement.classList.add("Eng-lang");
        bodyElement.classList.remove("arabic-lang");
        for (var i = 0; i < englishDataElements.length; i++) {
            if(englishDataElements[i].classList.contains('languageLabel') || englishDataElements[i].classList.contains('button')){
                englishDataElements[i].style.display="inline-block";  
            }
            else {
                englishDataElements[i].style.display="block";      
            }
         }
         for (var i = 0; i < arabicDataElements.length; i++) {
             arabicDataElements[i].style.display="none";
          }

    }else {
        document.getElementById("languages").value = "Arabic";
        bodyElement.classList.add("arabic-lang");
        bodyElement.classList.remove("Eng-lang");
        for (var i = 0; i < englishDataElements.length; i++) {
            englishDataElements[i].style.display="none";
         }
         for (var i = 0; i < arabicDataElements.length; i++) {
             arabicDataElements[i].style.display="block";
             if(arabicDataElements[i].classList.contains('lang') || arabicDataElements[i].classList.contains('button')){
                arabicDataElements[i].style.display="inline-block";  
            }
            else {
                arabicDataElements[i].style.display="block";      
            }
          }
    }
}