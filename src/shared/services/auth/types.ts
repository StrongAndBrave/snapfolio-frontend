// REGISTRATION

export type Registration = {
    userName: string;
    email: string;
    password: string;
    baseUrl: string;
};

export type EmailResending = {
    email: string;
    baseUrl: string;
};

export type Confirmation = {
    confirmationCode: string;
};

// SIGN IN

export type LoginDataRequest = {
    email: string;
    password: string;
};

export type LoginDataResponse = {
    accessToken: string;
};
