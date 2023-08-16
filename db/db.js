export default function GreetingDBLogic(db){

    async function getAll() {
        const all_data = await db.any('SELECT * FROM users')
        return all_data;
    }

    async function getName(theGreetedUser) {
        const result = await db.oneOrNone('SELECT * FROM users WHERE name = $1', [theGreetedUser]);
        return result
    }
    async function insertValues(usersName) {
        try {
            await db.none('INSERT INTO users (username, counter) VALUES($1, 1) ON CONFLICT (username) DO UPDATE SET counter = users.counter + 1', [usersName]);
        } catch (error) {
            console.error('Error inserting users data:', error);
        }
    }
    async function updateName(username, usercount) {
        const result = await db.none('UPDATE greeting SET count = $2 WHERE name = $1', [username, usercount]);
        return result;
    }

    return{
        getAll,
        getName,
        insertValues,
        updateName
    }

}