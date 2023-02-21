import { PokemonControllers } from "../../src/controllers/pokemon.js";
import { PokemonServices } from "../../src/services/pokemon.js";

jest.mock('../../src/services/pokemon.js');

describe('UNIT TEST: DELETE POKEMON CONTROLLER', () => {

  beforeEach(() => {
		PokemonServices.mockClear()
	});

  afterEach(() => {
		jest.clearAllMocks();
	});

	const mReq = {
    params: { id: 2 },
    headers: { authorization: 'Bearer Token' }
  };
	const mRes = {
		status: jest.fn(),
		json: jest.fn(),
	};
	const mNext = jest.fn();

  test('controller should call pokemon service deletePokemon method once', async () => {
		// Action
		await PokemonControllers.softDelete(mReq, mRes, mNext)
		// Assert
		expect(PokemonServices.deletePokemon).toHaveBeenCalledTimes(1);
	});
});
