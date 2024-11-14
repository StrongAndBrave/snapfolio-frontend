import type { Preview } from '@storybook/react';
import './../src/app/styles/styles.scss';
import './../src/shared/assets/fonts';

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
