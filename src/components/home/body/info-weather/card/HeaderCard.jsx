import { Stack } from "react-bootstrap";
import styled from "styled-components";

const Wrap = styled(Stack)`
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    padding: 20px 0;
`;

const HeaderCard = props => {
    const {data} = props;
    console.log(data);
    const getTime = new Date(data.resCurrent.dt * 1000);
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
	return (
		<Wrap direction="horizontal" gap={2}>
			<div>{data.resCurrent.name},{data.resCurrent.sys.country}</div>
			<div className="ms-auto">{dayNames[getTime.getDay()]}, {monthNames[getTime.getMonth()]} {getTime.getDate()}</div>
		</Wrap>
	);
};

export default HeaderCard;
