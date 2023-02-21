import { PokemonControllers } from "../../src/controllers/pokemon.js";
import { PokemonServices } from "../../src/services/pokemon.js";

jest.mock('../../src/services/pokemon.js');

describe('UNIT TEST: GET DETAIL POKEMON CONTROLLER', () => {

  beforeEach(() => {
		PokemonServices.mockClear()
	});

  afterEach(() => {
		jest.clearAllMocks();
	});

	const mReq = {
    params: { id: 2 }
  };
	const mRes = {
		status: jest.fn(),
		json: jest.fn(),
	};
	const mNext = jest.fn();

  test('controller should call pokemon service getPokemon method once', async () => {
		// Action
		await PokemonControllers.getDetail(mReq, mRes, mNext)
		// Assert
		expect(PokemonServices.getPokemon).toHaveBeenCalledTimes(1);
	});
});
