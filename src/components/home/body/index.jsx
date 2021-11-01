import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import InfoWeather from "./info-weather/InfoWeather";
import Map from "./map/Map";

const WrapBody = styled(Row)`
	padding-top: 80px;
    border-radius: 20px;
    .col-lg-6{
        margin-top: 10px;
    }
`;

const Body = props=> {
    return (
		<WrapBody>
			<Col lg={6}>
				<InfoWeather {...props} />
			</Col>
			<Col lg={6} style={{minHeight: '500px'}} >
				<Map {...props} />
			</Col>
		</WrapBody>
	);
};

export default Body;
