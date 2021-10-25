import{Row, Col} from "react-bootstrap";
import styled from "styled-components";

const TemperatureWrap = styled(Row)`
	.main__temperature__text {
        display: flex;
        justify-content: center;
        align-items: center;
        span{
            font-size: 100px;
            position: relative;
            span{
                position: absolute;
                top: -20px;
                right: -20px;
                font-size: 50px;
            }
        }
	}
    .main__temperature__cloud{
        width: 100%;
        border: 1px solid red;
        }
    }
`;


const Temperature = () => {
    return (
        <>
            <TemperatureWrap direction="horizontal" gap={2}>
				<Col className="main__temperature__text">
					<span>
						79 <span>°C</span>
					</span>
				</Col>
				<Col className="main__temperature__cloud ms-auto">
					<img
						alt=""
						src="https://openweathermap.org/img/wn/04d.png"
						width="100%"
					/>
				</Col>
			</TemperatureWrap>
        </>
    );
};

export default Temperature;