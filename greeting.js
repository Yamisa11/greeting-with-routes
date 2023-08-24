export default function Greeting() {
  var theName = "";
  let regex = /^[a-zA-Z]+$/;
  var allNames = [];
  let name = "";
  let greeting = "";
  let theCounter

  function setInputName(inputName) {
    theName = inputName.toLowerCase();
  }

  async function theGreeting(name1, language, database) {
    if (name1.match(/^[a-zA-Z]+$/)) {
      name = name1.charAt(0).toUpperCase() + name1.slice(1).toLocaleLowerCase();
      if (!errors(name, language)) {
        if (language == "english") {
          greeting = "Hello, " + name;
        }
        if (language == "isiZulu") {
          greeting = "Sawubona, " + name;
        }
        if (language == "isiXhosa") {
          greeting = "Molo, " + name;
        }
        await database.insertValues(name);
      }
      if (allNames.includes(name) === false && !errors(name, language)) {
        allNames.push(name);
      }
    }
  }
  // async function getCount(database) {
  //   theCounter = await database.getCounter()
  //   if (theCounter == undefined) {
  //     theCounter === 0
  //   }
  // }
  function getName() {
    return name;
  }

  async function userCounter(name, database) {
    await database.getUserCounter(name);
  }

  function getGreeting() {
    return greeting;
  }

  function errors(names, language) {
    if (names == "" && language == null) {
      return "Please enter name and language!";
    }
    if (!names.match(/^[a-zA-Z]+$/)) {
      return "Please enter valid name!";
    }
    if (names == "" && language != null) {
      return "Please enter name!";
    }
    if (language == null && names != "") {
      return "Please choose language!";
    }
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
    theGreeting,
    clearAll,
    classListError,
    success,
    getNames,
    getName,
    errors,
    userCounter,
   
  };
}
