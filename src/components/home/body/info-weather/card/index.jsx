import styled from "styled-components";
import HeaderCard from "./HeaderCard"
import BodyCard from "./body-card/BodyCard";

const WrapCard = styled.div`
    color: black;
    padding: 10px 10px 50px 10px;
    border-radius: 20px;
    background-image: linear-gradient(to right, #ec002c, #721519); 
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    animation: fromLeft 1s ease-in-out;
`

const Card = props => {
    return (
        <WrapCard>
            <HeaderCard {...props}/>
            <BodyCard {...props} />
        </WrapCard>
    );
};

export default Card;