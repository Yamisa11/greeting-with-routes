export default function Greeting(){
    var theName = "";
    let regex = /^[a-zA-Z]+$/;
    var allNames = [];
    let name = '';
    let greeting = '';
  
    function setInputName(inputName) {
      theName = inputName.toLowerCase();
    }
  
    function getInputName() {
      return theName;
    }
  
    function allNamesFunction(theName) {
      if (regex.test(theName) === true) {
        if (allNames.includes(theName) === false) {
          allNames.push(theName);
        }
        return allNames;
      }
    }
  
    // function isiXhosaGreeting() {
    //   return "Molo, " + theName.charAt(0).toUpperCase() + theName.slice(1);
    // }
  
    // function englishGreeting() {
    //   return "Hi, " + theName.charAt(0).toUpperCase() + theName.slice(1);
    // }
  
    // function isiZuluGreeting() {
    //   return "Sawubona, " + theName.charAt(0).toUpperCase() + theName.slice(1);
    // }
    function theGreeting(name1,language){
            if (name1.match(/^[a-zA-Z]+$/)) {
                name = name1.charAt(0).toUpperCase() + name1.slice(1).toLocaleLowerCase()
                if (language == 'english') {
                    greeting = 'Hello, ' + name
                }
                if (language == 'isiZulu') {
                    greeting = 'Sawubona, ' + name
                }
                if (language == 'isiXhosa') {
                    greeting = 'Molo, ' + name
                }
            }
        }
        function getGreeting() {
            return greeting
        }
  
    function errors(names,language){
      if (names == "" && language == null) {
        return "Please enter name and language!"
      }
      if (names == ""){
        return "Please enter name!"
      }
      if (language == null){
        return "Please choose language!"
      }
    
    }
    function invalidInput(){
      return "Please enter valid name!"
    }
    function classListError() {
      if (errors) {
        return "danger";
      }
    }
    function success() {
      return "successfully cleared!";
    }
  
    function clearAll() {
      localStorage.clear();
      allNames = [];
    }
  
    function getNames() {
      return allNames;
    }
  
  
    return {
        getGreeting,
      setInputName,
      getInputName,
    theGreeting,
      allNamesFunction,
      clearAll,
      classListError,
      success,
      getNames,
      getInputName,
      errors,
      invalidInput
    };
}