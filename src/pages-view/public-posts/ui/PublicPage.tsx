import styles from './PublicPage.module.scss';
import { AllUsers, PostList } from '@/features/posts/ui/view-post';

export const DEFAULT_AVATAR =
    'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192';

export const PublicPage = () => {
    return (
        <main className={styles.publicPage}>
            <AllUsers />
            <PostList />
        </main>
    );
};
