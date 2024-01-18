export type LoginType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  accessToken: string;
  user: {
    email: string;
    _id: string;
  };
};

export type SignUpType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpResponseType = {
  _id: string;
  email: string;
};
