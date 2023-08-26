import assert from "assert"
import GreetingDBLogic from "../db/db.js";
import pgPromise from 'pg-promise';

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/users';

const db = pgPromise()(connectionString);

describe('Greeting App database tests', () => {
    let greetingDBLogic = GreetingDBLogic(db)

    beforeEach(async () => {
        await greetingDBLogic.reset()
    })

    it('should be able to insert name value and retrieve it', async () => {
        await greetingDBLogic.insertValues('Yamisa');
    
        const result = await greetingDBLogic.getName('Yamisa');
        assert.strictEqual(result[0].username, 'Yamisa');
        assert.strictEqual(result[0].counter, 1);
      });

      it('should be able to retrieve all the usernames and counters from the database', async () => {
        await greetingDBLogic.insertValues('Yamisa');
        await greetingDBLogic.insertValues('Majija');
        await greetingDBLogic.insertValues('Asiphe');

        const result = await greetingDBLogic.getAll();
    
        assert.deepStrictEqual(result, [
          {
            counter: 1,
            username: 'Yamisa'
          },
          {
            counter: 1,
            username: 'Majija'
          },
          {
            counter: 1,
            username: 'Asiphe'
          }
        ]);
      });

      it('should be able to update the counter of a user already greeted', async () => {

        await greetingDBLogic.insertValues('Sinika');
        let result = await greetingDBLogic.getName('Sinika')
        await greetingDBLogic.insertValues('Sinika');
    
        result = await greetingDBLogic.getName('Sinika');
        assert.strictEqual(result[0].counter, 2);
      });

      it('should be abe to get an empty array when there are no names inserted into the database', async () => {
        const result = await greetingDBLogic.getAll();
    
        assert.strictEqual(result.length, 0);
      });

      
  it('should be able to reset the database', async () => {

    await greetingDBLogic.insertValues('Neza');

    await greetingDBLogic.reset();

    const result = await greetingDBLogic.getName('Neza');

    assert.strictEqual(result.length, 0);
  });

  it('should be able to get a users counter', async () => {
    await greetingDBLogic.insertValues('Yamisa');
    await greetingDBLogic.insertValues('Sihle')
    await greetingDBLogic.insertValues('Yamisa')

    const result = await greetingDBLogic.getUserCounter('Yamisa');
    assert.deepStrictEqual(result[0], {counter: 2} );
  });

})