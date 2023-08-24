export default function Counter(database){
    async function counterHistory(req, res) {
        let username = req.params.username;
        let theCount = (await database.getUserCounter(username))[0];
        console.log(theCount);
        res.render("counter", {
          user: username,
          count: theCount.counter,
        });
      }

      return{
        counterHistory
      }
}