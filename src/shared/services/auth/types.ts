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

// PASSWORD RECOVERY

export type PasswordRecovery = {
    email: string;
    recaptcha: string;
    baseUrl: string;
};

export type NewPassword = {
    newPassword: string;
    recoveryCode: string;
};

// USER

export type UserInfo = {
    userId: number;
    userName: string;
    email: string;
    isBlocked: boolean;
};

// UPDATE TOKENS

export type TokensResponse = {
    accessToken: string;
};
