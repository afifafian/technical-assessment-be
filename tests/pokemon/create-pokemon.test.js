import { PokemonControllers } from "../../src/controllers/pokemon.js";
import { PokemonServices } from "../../src/services/pokemon.js";

jest.mock('../../src/services/pokemon.js');

describe('UNIT TEST: CREATE POKEMON CONTROLLER', () => {

  beforeEach(() => {
		PokemonServices.mockClear()
	});

  afterEach(() => {
		jest.clearAllMocks();
	});

	const mReq = {
    body: {
      name: 'Mock Pokemon', type: ['electric'], description: 'mock desc', image: 'mockurl.png',
      monster_category: 'mock monster',
    },
    headers: { authorization: 'Bearer Token' }
  };
	const mRes = {
		status: jest.fn(),
		json: jest.fn(),
	};
	const mNext = jest.fn();

  test('controller should call pokemon service insertPokemon method once', async () => {
		// Action
		await PokemonControllers.create(mReq, mRes, mNext)
		// Assert
		expect(PokemonServices.insertPokemon).toHaveBeenCalledTimes(1);
	});
});
