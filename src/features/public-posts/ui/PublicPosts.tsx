'use client';
import { useState } from 'react';
import styles from './PublicPosts.module.scss';
import { PostModalContent } from '@/features/public-posts/ui/PostModalContent';
import { Modal } from '@/shared/ui';
import Image from 'next/image';
import { comments, commentsAnswers, posts } from '@/features/public-posts/api/mockUserPosts';

export const PublicPosts = () => {
    const [openedPostId, setOpenedPostId] = useState<number | null>(null);

    // const posts: Post[] = [
    //     {
    //         id: 1,
    //         userName: 'UnazarPrut',
    //         description:
    //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //         location: null,
    //         images: [
    //             {
    //                 url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/8b2db32b-ec72-48c2-9338-3144841d7d44_users/7/post/378f7598-3b06-4cea-8930-ea6232904835-images-1440x1440',
    //                 width: 1440,
    //                 height: 1440,
    //                 fileSize: 2988850,
    //                 createdAt: '2024-03-27T11:42:18.647Z',
    //                 uploadId: '66040619a12ed076f521d3ef',
    //             },
    //             {
    //                 url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/ea86f776-6051-4973-8c63-c8203451112a_users/1547/post/bf84361e-5287-4a9e-9e79-b525b2a6d29d-images-1440x1440',
    //                 width: 1440,
    //                 height: 1440,
    //                 fileSize: 143969,
    //                 createdAt: '2025-01-01T21:57:56.483Z',
    //                 uploadId: '6775ba64da9db3058aa6d07b',
    //             },
    //             {
    //                 url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/298b666b-5404-4fa5-be89-49a4a1b76b83_users/1547/post/743d39f3-3c89-4253-9d25-2a4d8a2b2c6d-images-1440x1440',
    //                 width: 1440,
    //                 height: 1440,
    //                 fileSize: 112357,
    //                 createdAt: '2025-01-01T21:57:56.483Z',
    //                 uploadId: '6775ba64da9db3058aa6d079',
    //             },
    //         ],
    //         createdAt: '2024-03-27T11:42:40.863Z',
    //         updatedAt: '2024-04-18T20:52:59.605Z',
    //         avatarOwner:
    //             'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/9acbd76d-2d0d-419c-a4f4-906ce905f2d3_users/7/avatar/59323949-94dd-4b37-b39f-0ba8595168e7-images-192x192',
    //         ownerId: 7,
    //         owner: {
    //             firstName: 'nazar',
    //             lastName: 'pryt',
    //         },
    //         likesCount: 2243,
    //         isLiked: false,
    //         avatarWhoLikes: [
    //             'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/9acbd76d-2d0d-419c-a4f4-906ce905f2d3_users/7/avatar/59323949-94dd-4b37-b39f-0ba8595168e7-images-192x192',
    //             'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/1661e7ca-edc5-4272-a67d-fa6d7207a3ae_users/1724/avatar/706e4292-57f2-4ba6-85be-c6ffb5503229-images-192x192',
    //             'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ee3ad62-3177-4960-ac16-fdb0b9beb9ed_users/1992/avatar/fc79b95c-6daa-450d-832a-369d212f9208-images-192x192',
    //         ],
    //     },
    //     {
    //         id: 2,
    //         userName: 'sergio',
    //         description: 'я тоже описание test post description',
    //         location: null,
    //         images: [
    //             {
    //                 url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/54c8b58b-bf50-4401-892b-e5d03093796f_users/6/post/a53c6a32-d0fb-4079-8158-e1b7de534980-images-1440x1440',
    //                 width: 1440,
    //                 height: 1440,
    //                 fileSize: 1165060,
    //                 createdAt: '2024-03-27T13:04:31.729Z',
    //                 uploadId: '6604195fa12ed076f521d40d',
    //             },
    //         ],
    //         createdAt: '2024-03-27T13:04:49.999Z',
    //         updatedAt: '2024-03-27T13:04:49.999Z',
    //         avatarOwner: '',
    //         ownerId: 6,
    //         owner: {
    //             firstName: null,
    //             lastName: null,
    //         },
    //         likesCount: 1,
    //         isLiked: false,
    //         avatarWhoLikes: [
    //             'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/9acbd76d-2d0d-419c-a4f4-906ce905f2d3_users/7/avatar/59323949-94dd-4b37-b39f-0ba8595168e7-images-192x192',
    //             'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/1661e7ca-edc5-4272-a67d-fa6d7207a3ae_users/1724/avatar/706e4292-57f2-4ba6-85be-c6ffb5503229-images-192x192',
    //         ],
    //     },
    //     {
    //         id: 3,
    //         userName: 'nastassia',
    //         description: 'v cv v',
    //         location: null,
    //         images: [
    //             {
    //                 url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/aea7c328-53d3-4de6-a8ee-0736d5ede05e_users/1913/post/cb4bcd40-7323-49ba-8dad-2e687e115a52-images-1440x1440',
    //                 width: 1440,
    //                 height: 1440,
    //                 fileSize: 339433,
    //                 createdAt: '2024-12-25T16:23:34.563Z',
    //                 uploadId: '676c3186da9db3058aa6c75d',
    //             },
    //         ],
    //         createdAt: '2024-12-25T16:23:35.114Z',
    //         updatedAt: '2024-12-25T16:23:35.114Z',
    //         avatarOwner:
    //             'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/e64743e6-5fc6-4e55-ad43-46b8a6d65a69_users/1913/avatar/0714461b-3797-4dee-97d8-55c4c02d95a2-images-192x192',
    //         ownerId: 1913,
    //         owner: {
    //             firstName: 'NASTASSIA',
    //             lastName: 'Dziaruha',
    //         },
    //         likesCount: 10,
    //         isLiked: false,
    //         avatarWhoLikes: [
    //             'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/9acbd76d-2d0d-419c-a4f4-906ce905f2d3_users/7/avatar/59323949-94dd-4b37-b39f-0ba8595168e7-images-192x192',
    //         ],
    //     },
    // ];
    //
    // const comments: Comment[] = [
    //     {
    //         id: 1,
    //         postId: 1, // Связан с постом id=1
    //         from: {
    //             id: 1,
    //             username: 'user1',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/3c1f63d0-ab4d-4419-9666-5fca02e95d5f_users/1547/avatar/65c14e51-f06a-4606-9bb6-a986370092c5-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это первый комментарий к первому посту!',
    //         createdAt: '2025-01-08T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 2,
    //         postId: 1, // Связан с постом id=1
    //         from: {
    //             id: 2,
    //             username: 'user2',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content:
    //             'Это второй комментарий к первому посту! Это второй комментарий к первому посту! Это второй' +
    //             ' комментарий к первому посту! ',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 3,
    //         postId: 2, // Связан с постом id=2
    //         from: {
    //             id: 3,
    //             username: 'user3',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content:
    //             'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 4,
    //         postId: 1,
    //         from: {
    //             id: 1,
    //             username: 'user1',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/3c1f63d0-ab4d-4419-9666-5fca02e95d5f_users/1547/avatar/65c14e51-f06a-4606-9bb6-a986370092c5-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это 4 комментарий к первому посту!',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 5,
    //         postId: 1,
    //         from: {
    //             id: 2,
    //             username: 'user2',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content:
    //             'Это 5 комментарий к первому посту! Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 6,
    //         postId: 1, // Связан с постом id=1
    //         from: {
    //             id: 1,
    //             username: 'user1',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/3c1f63d0-ab4d-4419-9666-5fca02e95d5f_users/1547/avatar/65c14e51-f06a-4606-9bb6-a986370092c5-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это первый комментарий к первому посту!',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 7,
    //         postId: 1, // Связан с постом id=1
    //         from: {
    //             id: 2,
    //             username: 'user2',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это второй комментарий к первому посту!',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 8,
    //         postId: 1, // Связан с постом id=1
    //         from: {
    //             id: 2,
    //             username: 'user2',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content:
    //             'Это 8 комментарий к первому посту! Это 8 комментарий к первому посту! Это 8 комментарий к первому посту!',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 9,
    //         postId: 2, // Связан с постом id=2
    //         from: {
    //             id: 3,
    //             username: 'user3',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это второй комментарий ко второму посту!',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 10,
    //         postId: 2, // Связан с постом id=2
    //         from: {
    //             id: 2,
    //             username: 'user2',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это второй комментарий к первому посту!',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 11,
    //         postId: 2, // Связан с постом id=2
    //         from: {
    //             id: 2,
    //             username: 'user2',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это второй комментарий к первому посту!',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 12,
    //         postId: 2, // Связан с постом id=2
    //         from: {
    //             id: 1,
    //             username: 'user1',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/3c1f63d0-ab4d-4419-9666-5fca02e95d5f_users/1547/avatar/65c14e51-f06a-4606-9bb6-a986370092c5-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content:
    //             'Это комментарий к посту! Это комментарий к посту! Это комментарий к посту! Это комментарий к' +
    //             ' посту! Это комментарий к посту! Это комментарий к посту! Это комментарий к посту!',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 13,
    //         postId: 3,
    //         from: {
    //             id: 1,
    //             username: 'user1',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/3c1f63d0-ab4d-4419-9666-5fca02e95d5f_users/1547/avatar/65c14e51-f06a-4606-9bb6-a986370092c5-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content:
    //             'Это комментарий к посту! Это комментарий к посту! Это комментарий к посту! Это комментарий к' +
    //             ' посту! Это комментарий к посту! Это комментарий к посту! Это комментарий к посту!',
    //         createdAt: '2024-01-01T00:00:00.000Z',
    //         answerCount: 0,
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    // ];
    //
    // const commentsAnswers: CommentAnswer[] = [
    //     {
    //         id: 101,
    //         commentId: 1, // Ответ на комментарий с id=1
    //         from: {
    //             id: 3,
    //             username: 'user3',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content:
    //             'Это ответ на первый комментарий! Это ответ на первый комментарий! Это ответ на первый комментарий!',
    //         createdAt: '2025-01-08T01:00:00.000Z',
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 102,
    //         commentId: 1, // Ответ на комментарий с id=2
    //         from: {
    //             id: 2,
    //             username: 'user2',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это ответ на второй комментарий!',
    //         createdAt: '2025-01-08T01:00:00.000Z',
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 103,
    //         commentId: 13, // Ответ на комментарий с id=2
    //         from: {
    //             id: 2,
    //             username: 'user2',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это ответ на второй комментарий!',
    //         createdAt: '2025-01-08T01:00:00.000Z',
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    //     {
    //         id: 104,
    //         commentId: 7, // Ответ на комментарий с id=2
    //         from: {
    //             id: 2,
    //             username: 'user2',
    //             avatars: [
    //                 {
    //                     url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192',
    //                     width: 45,
    //                     height: 45,
    //                     fileSize: 1234,
    //                     createdAt: '2024-01-01T00:00:00.000Z',
    //                 },
    //             ],
    //         },
    //         content: 'Это ответ на второй комментарий!',
    //         createdAt: '2025-01-08T01:00:00.000Z',
    //         likeCount: 0,
    //         isLiked: false,
    //     },
    // ];

    const currentPost = posts.find(post => post.id === openedPostId);
    const currentPostComments = comments.filter(comment => comment.postId === openedPostId);

    return (
        <div className={styles.profilePage}>
            <h1>Profile Page</h1>
            <div className={styles.postsGrid}>
                {posts.map(post => (
                    <Image
                        key={post.id}
                        src={post.images[0].url}
                        alt="Post"
                        width={1}
                        height={1}
                        onClick={() => setOpenedPostId(post.id)}
                    />
                ))}
            </div>
            {currentPost && (
                <Modal
                    isOpen={Boolean(openedPostId)}
                    className={styles.postModal}
                    onCloseAction={() => setOpenedPostId(null)}
                >
                    <PostModalContent
                        post={currentPost}
                        comments={currentPostComments}
                        commentAnswer={commentsAnswers}
                    />
                </Modal>
            )}
        </div>
    );
};
