import { FC, SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & {
    size?: number;
    color?: string;
};

export const LoupeIcon: FC<Props> = ({ size = 24, color = 'currentColor', ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <path
            d="M17.25 16.07L14.42 13.25C15.33 12.08 15.83 10.64 15.83 9.16C15.83 7.84 15.44 6.55 14.7 5.46C13.97 4.36 12.93 3.51 11.71 3C10.49 2.5 9.15 2.37 7.86 2.62C6.57 2.88 5.38 3.52 4.45 4.45C3.52 5.38 2.88 6.57 2.62 7.86C2.37 9.15 2.5 10.49 3 11.71C3.51 12.93 4.36 13.97 5.46 14.7C6.55 15.44 7.84 15.83 9.16 15.83C10.64 15.83 12.08 15.33 13.25 14.42L16.07 17.25C16.24 17.39 16.55 17.5 16.66 17.5C16.77 17.5 16.88 17.48 16.98 17.44C17.08 17.39 17.18 17.33 17.25 17.25C17.33 17.18 17.39 17.08 17.44 16.98C17.48 16.88 17.5 16.77 17.5 16.66C17.5 16.55 17.48 16.44 17.44 16.34C17.39 16.24 17.33 16.15 17.25 16.07ZM4.16 9.16C4.16 8.17 4.45 7.21 5 6.38C5.55 5.56 6.33 4.92 7.25 4.54C8.16 4.16 9.17 4.06 10.14 4.26C11.11 4.45 12 4.93 12.7 5.63C13.4 6.33 13.87 7.22 14.07 8.19C14.26 9.16 14.16 10.16 13.78 11.08C13.4 11.99 12.76 12.77 11.94 13.32C11.12 13.87 10.15 14.16 9.16 14.16C7.84 14.16 6.56 13.63 5.63 12.7C4.69 11.76 4.16 10.49 4.16 9.16Z"
            fill={color}
        />
    </svg>
);