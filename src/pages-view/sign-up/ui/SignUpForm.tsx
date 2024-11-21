import React, {useState} from 'react';
import {Button, Checkbox, Input, Password} from "@/shared/ui";
import Link from "next/link";
import styles from './SignUp.module.scss'

export const SignUpForm = () => {
    const [on, setOn]= useState(true)


    return (
        <form action="">
            <Input type={'text'} error={'sjkdhfsjh sdhfjksdhf jksdhfkjhsdf jskjdhfjkh'} label={'Username'} className={styles.field}/>
            <Input type={'email'} label={'Email'} className={styles.field}/>
            <Password label={'Password'} className={styles.field}/>
            <Password label={'Password confirmation'} className={styles.field}/>
            <div className={styles.legal}>
                <Checkbox  checked={on} onChange={()=> setOn(!on)}>1232</Checkbox>
                {/*<span>I agree to the <Link  href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link></span>*/}
            </div>
            <Button variant={"contained"} fullWidth >Sign Up</Button>
        </form>
    );
};