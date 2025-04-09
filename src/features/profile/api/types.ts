export type Avatar = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string; // ISO-строка
};

export type UserProfile = {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    region: string;
    dateOfBirth: string; // ISO-строка (например, "2020-01-01")
    aboutMe: string;
    avatars: Avatar[];
    createdAt: string; // ISO-строка
};