import type { ReactNode } from "react"
import { Header } from "../../components/Header"

type childrenProps = {
    children: ReactNode
}

export const Layouts = ({children}: childrenProps) => {

    return(
        <>
            <Header />
            {children}
        </>
    )
}