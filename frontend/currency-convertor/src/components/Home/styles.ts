import styled from "styled-components";


export const HeroSection = styled.section`
    background: linear-gradient(
            135deg, ${({theme}) => theme["blue-600"]} 80%, ${({theme}) => theme["cyan-500"]} 100%
        );
    padding: 70px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${({theme}) => theme.white}
`; 