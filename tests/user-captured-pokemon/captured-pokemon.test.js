import { UserCapturedPokemonControllers } from "../../src/controllers/user-captured-pokemon.js";
import { UserCapturedPokemonServices } from "../../src/services/user-captured-pokemon.js";

jest.mock('../../src/services/user-captured-pokemon.js');

describe('UNIT TEST: CAPTURE POKEMON CONTROLLER', () => {

  beforeEach(() => {
		UserCapturedPokemonServices.mockClear()
	});

  afterEach(() => {
		jest.clearAllMocks();
	});

	const mReq = {
    body: {
      pokemon_id: 1,
    },
    headers: { authorization: 'Bearer Token' }
  };
	const mRes = {
		status: jest.fn(),
		json: jest.fn(),
	};
	const mNext = jest.fn();

  test('controller should call pokemon service capturePokemon method once', async () => {
		// Action
		await UserCapturedPokemonControllers.create(mReq, mRes, mNext)
		// Assert
		expect(UserCapturedPokemonServices.capturePokemon).toHaveBeenCalledTimes(1);
	});
});
