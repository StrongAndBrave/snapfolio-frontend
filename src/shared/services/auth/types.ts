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
