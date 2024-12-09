import Image from 'next/image';
import svgGoogle from '../../../../public/svg/google.svg';
import svgGithub from '../../../../public/svg/github.svg';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
    label: 'github' | 'google';
} & ComponentPropsWithoutRef<'button'>;

export const BtnAuth = ({ label }: Props) => {
    const srcImg = label === 'github' ? svgGithub : svgGoogle;

    return (
        <button type="button">
            <Image src={srcImg} alt={`Sign in with ${label}`} />
        </button>
    );
};
