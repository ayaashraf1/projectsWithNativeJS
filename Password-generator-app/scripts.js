/**
 * like that https://codepen.io/FlorinPop17/full/BaBePej
 * numbers
 * letters
 * symbols
 * copy to clipboard
 */
     const numbers = '0123456789';
     const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
     const upperLetters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
     const symbols = '!@#$%^&*()_+=';
     let password = '';

     function clipBoardFun(){
       var copyText = document.getElementById("passwordInput");
       copyText.select();
       copyText.setSelectionRange(0, 99999)
       document.execCommand("copy");
     }
     function getPasswordOptions(){
         const length = document.getElementById("passwordLengthInput").value;
         const upperCaseLetters =  document.getElementById("upperCaseLetters").checked;
         const lowerCaseLetters =  document.getElementById("lowerCaseLetters").checked;
         const numbersOption =  document.getElementById("numbers").checked;
         const symbolsOption =  document.getElementById("symbols").checked;
        return {length,upperCaseLetters,lowerCaseLetters,numbersOption,symbolsOption};
     }
     function getArrayOfElementOptions(options){
        let finalOptionsElements = '';
        for (const property in options) {
            if(property === 'lowerCaseLetters' && options[property]){
                finalOptionsElements+=lowerLetters;
                password += lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
            }else if(property === 'upperCaseLetters' && options[property]){
                finalOptionsElements+=upperLetters;
                password += upperLetters[Math.floor(Math.random() * upperLetters.length)];

            }else if(property === 'numbersOption' && options[property]){
                finalOptionsElements += numbers;
                password += numbers[Math.floor(Math.random() * numbers.length)];

            }else if(property === 'symbolsOption' && options[property]){
                finalOptionsElements+=symbols;
                password += symbols[Math.floor(Math.random() * symbols.length)];

            }
          }
          return finalOptionsElements;
     }

     function generatePassword(){
         password = '';
        const options = getPasswordOptions();
            const finalString = getArrayOfElementOptions(options);
            if(finalString.length > 0){
                for (let i = password.length; i < options["length"]; i++) {
                    password += finalString[Math.floor(Math.random() * finalString.length)];
                }
                document.getElementById('passwordInput').value = password;
            }else{
                alert('please check at least one option...');
            }
     }