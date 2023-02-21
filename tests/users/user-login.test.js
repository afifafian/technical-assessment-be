import { UserControllers } from "../../src/controllers/user.js";
import { UserServices } from "../../src/services/user.js";

jest.mock('../../src/services/user.js');

describe('UNIT TEST: USER LOGIN CONTROLLER', () => {

  beforeEach(() => {
		UserServices.mockClear()
	});

  afterEach(() => {
		jest.clearAllMocks();
	});

	const mReq = {
    body: {
      username: 'mockusername',
      password: 'mockedpassword'
    },
  };
	const mRes = {
		status: jest.fn(),
		json: jest.fn(),
	};
	const mNext = jest.fn();

  test('controller should call pokemon service findByUsername method once', async () => {
		// Action
		await UserControllers.login(mReq, mRes, mNext)
		// Assert
		expect(UserServices.findByUsername).toHaveBeenCalledTimes(1);
	});
});
