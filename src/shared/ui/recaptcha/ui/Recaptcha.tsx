import ReCAPTCHA from 'react-google-recaptcha';
import './Recaptcha.css';

type Props = {
    onChange: (data: string | null) => void;
};
export const Recaptcha = ({ onChange }: Props) => {
    return (
        <div className="recaptcha">
            <ReCAPTCHA
                sitekey="6LdHxG4qAAAAAPKRxEHrlV5VvLFHIf2BO5NMI8YM"
                onChange={e => onChange(e)}
                theme="dark"
                hl="en"
            />
        </div>
    );
};
// 6LdHxG4qAAAAAPKRxEHrlV5VvLFHIf2BO5NMI8YM 30.10

// 6LdR8pMqAAAAAH2qt7mLZpFlAq7RZA7tzgRnaaYs мой
