import { Link } from "react-router-dom"
import { Head, Nav, Ul } from "./styles"

export const Header = () => {
    return(
        <Head>
            <Nav>
                <Ul>
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About</Link>
                </Ul>
            </Nav>

        </Head>
    )
}