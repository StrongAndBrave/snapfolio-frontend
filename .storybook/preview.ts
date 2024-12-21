import type { Preview } from '@storybook/react';
import '@/app/styles/_normalize.scss';
import '@/app/styles/_globals.scss';
import '@/shared/assets/fonts';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
