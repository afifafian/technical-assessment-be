import { PokemonControllers } from "../../src/controllers/pokemon.js";
import { PokemonServices } from "../../src/services/pokemon.js";

jest.mock('../../src/services/pokemon.js');

describe('UNIT TEST: GET ALL POKEMON CONTROLLER', () => {

  beforeEach(() => {
		PokemonServices.mockClear()
	});

  afterEach(() => {
		jest.clearAllMocks();
	});

	const mReq = {
    query: {}
  };
	const mRes = {
		status: jest.fn(),
		json: jest.fn(),
	};
	const mNext = jest.fn();

  test('controller should call pokemon service getPokemons method once', async () => {
		// Action
		await PokemonControllers.get(mReq, mRes, mNext)
		// Assert
		expect(PokemonServices.getPokemons).toHaveBeenCalledTimes(1);
	});
});
