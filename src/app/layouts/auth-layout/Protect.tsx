'use client'
import {ReactNode, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useAppSelector} from "@/app/store/store";
import {selectIsAuthorized} from "@/features/auth/model/authSlice";

type Props = {
    children: ReactNode
}

export const Protect = ({children}:Props) => {
    const router = useRouter();
    const pathname = usePathname()
    const protectedRoutes = '/auth/';

    const isAuthorized = useAppSelector(selectIsAuthorized);

    useEffect(()=>{
        if (isAuthorized && pathname.includes(protectedRoutes)) {
            router.push('/');
        }
    },[isAuthorized, pathname])


    return (
        <div>
            {isAuthorized ? null : children }
        </div>
    );
};