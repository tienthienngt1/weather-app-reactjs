import {Row, Col} from "react-bootstrap"
import styled from "styled-components";
import Card from "./card"
import Map from "./Map"

const WrapContainer = styled(Row)`
    border: 1px solid red;
    padding-top: 80px;
`

const Container = () => {
    return (
        <WrapContainer>
            <Col lg={6}>
                <Card />
            </Col>
            <Col lg={6}>
                <Map />
            </Col>
        </WrapContainer>
    );
};

export default Container;