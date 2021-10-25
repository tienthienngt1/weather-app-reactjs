import styled from "styled-components";
import HeaderCard from "./HeaderCard"
import Main from "./main/Main"

const WrapCard = styled.div`
    color: black;
    padding: 10px;
    background-image: linear-gradient(to right, #ec008c, #fc6767); 
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`

const Card = () => {
    return (
        <WrapCard>
            <HeaderCard />
            <Main />
        </WrapCard>
    );
};

export default Card;