import knex from './knex.js';

/**
 * Test db connection on startup
 *
 * @returns void
 */
const testDb = async () => {
	try {
		await knex.raw('select 1');
		console.log('status db connection : success');
	} catch (err) {
		console.log('status db connection : invalid', err);
	}
};

export {
	testDb,
};
