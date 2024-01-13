export type LoginType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
};
