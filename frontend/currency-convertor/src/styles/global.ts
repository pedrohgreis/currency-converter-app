import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }


    body {
        background-color: ${({theme}) => theme["slate-50"]};
        -webkit-font-smoothing: antialiased;
        width: 100vw;
        height: 100vh;
        overflow-x: hidden; 
    }
`;