import {Row, Col} from "react-bootstrap"
import styled from "styled-components";
import Card from "./card"
import Map from "./Map"

const WrapContainer = styled(Row)`
    padding-top: 80px;
`

const Container = props => {
    return (
        <WrapContainer>
            <Col lg={6}>
                <Card {...props} />
            </Col>
            <Col lg={6}>
                <Map />
            </Col>
        </WrapContainer>
    );
};

export default Container;