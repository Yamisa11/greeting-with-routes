export default function GreetingRoute(greetingFunction, database) {
  let greetingMsg;
  let nameCounts
  let errors
  function index(req, res) {
   
    let errorMsg = req.flash("error")[0];
    let resetMsg = req.flash("resetMsg");
    res.render("index", {
      showGreet: greetingFunction.getName(),
      theGreeting: errorMsg ? "" : greetingMsg,
      errorMessage: errorMsg,
      counter: nameCounts,
      resetMessage: resetMsg,
    });
  }

  async function greeting(req, res) {
    await greetingFunction.theGreeting(
      req.body.theInputName,
      req.body.languageInput,
      database
    );
    errors = greetingFunction.errors(
      req.body.theInputName,
      req.body.languageInput
    );
    req.flash("error", errors);
    greetingMsg = greetingFunction.getGreeting();

    nameCounts = await database.getCounter();

    res.redirect("/");
  }

  async function reset(req, res) {
    await database.reset(database);
    req.flash("resetMsg", "Successfully cleared database!");
    greetingMsg = "";
    nameCounts = 0;
    res.redirect("/");
  }

  return {
    index,
    greeting,
    reset,
  };
}
