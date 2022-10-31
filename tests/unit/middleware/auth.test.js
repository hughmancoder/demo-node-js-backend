const { User } = require('../../../models/user');
const auth = require('../../../middleware/auth');

describe('auth middleware', () =>  {
    it('should populate req.user with payload of valid jwt', () => {
        const token = new User().generateAuthToken();
        const req = { header: jest.fn().mockReturnValue(token) };
    });
});