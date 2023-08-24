export default function Greeted(database){

    async function greeted (req, res) {
        res.render("greeted", {
          listOfNames: await database.getAll(),
        });
      }

    return{
        greeted
    }
}