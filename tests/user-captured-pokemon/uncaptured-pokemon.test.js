import { UserCapturedPokemonControllers } from "../../src/controllers/user-captured-pokemon.js";
import { UserCapturedPokemonServices } from "../../src/services/user-captured-pokemon.js";

jest.mock('../../src/services/user-captured-pokemon.js');

describe('UNIT TEST: UNCAPTURE POKEMON CONTROLLER', () => {

  beforeEach(() => {
		UserCapturedPokemonServices.mockClear()
	});

  afterEach(() => {
		jest.clearAllMocks();
	});

	const mReq = {
    params: {
      pokemonId: 1,
    },
    headers: { authorization: 'Bearer Token' }
  };
	const mRes = {
		status: jest.fn(),
		json: jest.fn(),
	};
	const mNext = jest.fn();

  test('controller should call pokemon service uncapturePokemon method once', async () => {
		// Action
		await UserCapturedPokemonControllers.destroy(mReq, mRes, mNext)
		// Assert
		expect(UserCapturedPokemonServices.uncapturePokemon).toHaveBeenCalledTimes(1);
	});
});
