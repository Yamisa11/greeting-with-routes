export default function GreetingDBLogic(db){

    async function getAll() {
        const all_data = await db.any('SELECT * FROM users')
        return all_data;
    }

    async function getName(nameGreeted) {
        const result = await db.oneOrNone('SELECT * FROM users WHERE name = $1', [nameGreeted]);
        return result
    }


    return{
        getAll,
        getName
    }

}