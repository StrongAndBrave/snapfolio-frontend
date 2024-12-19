import {Protect} from "@/app/layouts/auth-layout/Protect";
import {ReactNode} from "react";

type Props = {
    children: ReactNode
}
export  const AuthLayout = ({children}: Props)  => {
    return <Protect>{children}</Protect>;
}