import { UserProfile } from '@/features/public-posts/model';

export const mockProfiles: Record<string, UserProfile> = {
    '1547': {
        id: 1547,
        userName: 'sergejuss',
        aboutMe:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et' +
            ' dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut' +
            ' aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        avatars: [
            'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/3c1f63d0-ab4d-4419-9666-5fca02e95d5f_users/1547/avatar/65c14e51-f06a-4606-9bb6-a986370092c5-images-192x192',
        ],
        userMetadata: {
            following: 2218,
            followers: 2358,
            publications: 2764,
        },
    },
    '1724': {
        id: 1724,
        userName: '_Rechee_',
        aboutMe: 'тестовый второй ',
        avatars: [
            'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/1661e7ca-edc5-4272-a67d-fa6d7207a3ae_users/1724/avatar/706e4292-57f2-4ba6-85be-c6ffb5503229-images-192x192',
        ],
        userMetadata: {
            following: 1118,
            followers: 412,
            publications: 321,
        },
    },
    '1992': {
        id: 1992,
        userName: 'Alikhan',
        aboutMe:
            'тестовый профиль описание 3 на русском языке чтобы понять сколько надо строк а русском языке чтобы понять сколько надо строка русском языке чтобы понять сколько надо строка русском языке чтобы понять сколько надо строк ',
        avatars: [
            'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ee3ad62-3177-4960-ac16-fdb0b9beb9ed_users/1992/avatar/fc79b95c-6daa-450d-832a-369d212f9208-images-192x192',
        ],
        userMetadata: {
            following: 185,
            followers: 1523,
            publications: 31,
        },
    },
    '1474': {
        id: 1474,
        userName: 'ammonite',
        aboutMe:
            'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких',
        avatars: [
            'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/e054fcb5-e973-4e7b-9799-e14e366138f5_users/1474/avatar/e2980888-c8c0-4e86-ab39-067176874b6f-images-192x192',
        ],
        userMetadata: {
            following: 132,
            followers: 41,
            publications: 3,
        },
    },
};
