import styled from "styled-components";

export const Head = styled.header`
    width: 100vw;
    height: 3rem;
    background-color: ${({theme}) => theme["slate-500"]};
    color: ${({theme}) => theme["slate-800"]};

    display: flex;
    justify-content: space-around;
`;

export const Nav = styled.nav`
    width: 50vw;
    height: 10rem;
    //background-color: ${({theme}) => theme["slate-200"]};
    color: ${({theme}) => theme["slate-800"]};

    display: flex;
    justify-content: space-around;
`;

export const Ul = styled.ul`
    list-style: none;
`;
