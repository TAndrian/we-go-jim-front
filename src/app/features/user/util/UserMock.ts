import { CreateUser } from '../model/CreateUser';
import { User } from '../model/User';

const JOHN_DOE_MOCK: User = {
  id: '8cfef374-700d-4d57-8fe8-688b976458e4',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.does@test.com'
};

const CREATE_JANE_SMITH_MOCK: CreateUser = {
  id: '7a968cb2-1e18-428e-84b3-e46952b11756',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@test.com',
  password: ''
};

const JANE_SMITH_MOCK: User = {
  id: '7a968cb2-1e18-428e-84b3-e46952b11756',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@test.com'
};

export { JOHN_DOE_MOCK, CREATE_JANE_SMITH_MOCK, JANE_SMITH_MOCK };
