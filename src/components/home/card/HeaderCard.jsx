import { Stack } from "react-bootstrap";
import styled from "styled-components";

const Wrap = styled(Stack)`
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    padding: 20px 0;
`;

const HeaderCard = () => {
	return (
		<Wrap direction="horizontal" gap={2}>
			<div>HaNoi,Vn</div>
			<div className="ms-auto">Sun,October 25</div>
		</Wrap>
	);
};

export default HeaderCard;
