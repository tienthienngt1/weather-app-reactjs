import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { LINK_IMAGE } from "../../../../constants";

const HistoryWeeklyWrap = styled(Row)`
	.col {
		text-align: center;
	}
`;

const HistoryWeekly = (props) => {
    console.log(props);
	let data = props.data.resHistory;
	data.sort((a, b) => b.dt - a.dt);
	const array = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	return (
		<HistoryWeeklyWrap>
			{data.reverse().map((res) => (
				<Col key={res.dt}>
					<div>{array[new Date(res.dt * 1000).getDay()]}</div>
					<div>
						{new Date(res.dt * 1000).getDate()}/
						{new Date(res.dt * 1000).getMonth()}
					</div>
					<div>
						<img
							src={`${LINK_IMAGE}${res.weather[0].icon}.png`}
							alt=""
							width="100%"
						/>
					</div>
					<div>{res.weather[0].main}</div>
					<div>{res.temp}°C</div>
				</Col>
			))}
		</HistoryWeeklyWrap>
	);
};

export default HistoryWeekly;
