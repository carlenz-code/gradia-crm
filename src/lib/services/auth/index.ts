import * as user from './user.service';
import * as password from './password.service';

export const authService = {
  ...user,
  ...password,
};