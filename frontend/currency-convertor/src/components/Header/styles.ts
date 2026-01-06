import styled from "styled-components";

export const Head = styled.header`
    width: 100vw;
    height: 3rem;
    background-color: ${({theme}) => theme["slate-50"]};
    color: ${({theme}) => theme["slate-800"]};

    display: flex;
    justify-content: space-around;
`;

export const Nav = styled.nav`
    width: 40vw;
    height: 3rem;
    background-color: ${({theme}) => theme["slate-50"]};
    color: ${({theme}) => theme["slate-800"]};

    display: flex;
    justify-content: space-around;
`;

export const Ul = styled.ul`
    list-style: none;
    

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 0.5rem;
    width: 100%;

    a {
        text-decoration: none;
        color: ${({theme}) => theme["slate-800"]};
        font-weight: 500;
        padding: 0.93rem 1rem;
        transition: all 0.2s ease-in-out;
        border-radius: 8px;
        display: inline-block;

        &:hover {
            background-color: ${({theme}) => theme["blue-100"]};
            color: ${({theme}) => theme["blue-600"]};
        }

        &:active{
            color: ${({theme}) => theme["blue-600"]};
            background-color: ${({theme}) => theme["blue-50"]}
        }
    }
    
`;
