import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Typed from "react-typed";

const TemperatureWrap = styled(Row)`
	.main__temperature__text {
        display: flex;
        justify-content: center;
        align-items: center;
        span{
            text-align: center;
            span.temperature__text{
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
	}
    .main__temperature__cloud{
        width: 100%;
        }
    }
`;

const Temperature = (props) => {
	let { data:{data} } = props;
    data = data.resHistory.sort((a,b) => b.dt - a.dt);
	return (
		<>
			<TemperatureWrap direction="horizontal" gap={2}>
				<Col className="main__temperature__text">
					<span>
						<span className="temperature__text">
							 
                             {data[0].temp}
							<span>°C</span>
						</span>
						<h3 style={{ color: "black" }}>
                            <Typed
                                strings={[
                                    data[0].weather[0].description.toUpperCase()
                                ]}
                                typeSpeed={100} loop/>
						</h3>
					</span>
				</Col>
				<Col className="main__temperature__cloud ms-auto">
					<img
						alt={data[0].weather[0].description}
						src={`https://openweathermap.org/img/wn/${data[0].weather[0].icon}.png`}
						width="100%"
					/>
				</Col>
			</TemperatureWrap>
		</>
	);
};

export default Temperature;
