import { PokemonControllers } from "../../src/controllers/pokemon.js";
import { PokemonServices } from "../../src/services/pokemon.js";

jest.mock('../../src/services/pokemon.js');

describe('UNIT TEST: UPDATE POKEMON CONTROLLER', () => {

  beforeEach(() => {
		PokemonServices.mockClear()
	});

  afterEach(() => {
		jest.clearAllMocks();
	});

	const mReq = {
    params: { id: 2 },
    body: {
      name: 'Update Pokemon', type: ['electric'], description: 'update desc', image: 'mockurl.png',
      monster_category: 'updated monster',
    },
    headers: { authorization: 'Bearer Token' }
  };
	const mRes = {
		status: jest.fn(),
		json: jest.fn(),
	};
	const mNext = jest.fn();

  test('controller should call pokemon service updatePokemon method once', async () => {
		// Action
		await PokemonControllers.update(mReq, mRes, mNext)
		// Assert
		expect(PokemonServices.updatePokemon).toHaveBeenCalledTimes(1);
	});
});
