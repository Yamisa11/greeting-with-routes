export default function GreetingDBLogic(database){

    async function getAll() {
        const all_data = await database.any('SELECT * FROM users')
        return all_data;
    }

    async function getName(theGreetedUser) {
        const result = await database.any('SELECT * FROM users WHERE username = $1', [theGreetedUser]);
        return result
    }
    async function insertValues(usersName) {
        try {
            await database.any('INSERT INTO users (username, counter) VALUES($1, 1) ON CONFLICT (username) DO UPDATE SET counter = users.counter + 1', [usersName]);
        } catch (error) {
            console.error('Error inserting users data:', error);
        }
    }
    async function reset() {
        const clear = await database.none('DELETE FROM users')
        return clear;
    }
    async function getUserCounter(theGreetedUser){
        const result = await database.any('SELECT counter FROM users WHERE username = $1', [theGreetedUser])
        return result
    }
    async function getCounter(){
        const result =  await database.any('SELECT * FROM users')
        console.log(result);
        return result.length
    }

    return{
        getAll,
        getName,
        insertValues,
        reset,
        getUserCounter,
        getCounter
    }

}