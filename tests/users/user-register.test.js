import { UserControllers } from "../../src/controllers/user.js";
import { UserServices } from "../../src/services/user.js";

jest.mock('../../src/services/user.js');

describe('UNIT TEST: USER REGISTER CONTROLLER', () => {

  beforeEach(() => {
		UserServices.mockClear()
	});

  afterEach(() => {
		jest.clearAllMocks();
	});

	const mReq = {
    body: {
      name: 'Mock Name',
      username: 'mockusername',
      password: 'mockedpassword',
      role: 'Admin'
    },
  };
	const mRes = {
		status: jest.fn(),
		json: jest.fn(),
	};
	const mNext = jest.fn();

  test('controller should call pokemon service createUser method once', async () => {
		// Action
		await UserControllers.register(mReq, mRes, mNext)
		// Assert
		expect(UserServices.createUser).toHaveBeenCalledTimes(1);
	});
});
