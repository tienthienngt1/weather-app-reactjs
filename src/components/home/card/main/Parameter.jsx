import {Row, Col} from "react-bootstrap";
import styled from "styled-components";
import { IoMdWater } from "react-icons/io";
import { GiPaperWindmill } from "react-icons/gi";
import {BsFillFunnelFill} from "react-icons/bs";

const ParameterWrap = styled(Row)`
    padding: 20px 0;
    font-size: 20px;
    .col{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;



const Parameter = props => {
    const {data} = props;
    return (
        <>
            <ParameterWrap>
				<Col>
					<IoMdWater className="m-1" /> {data.resCurrent.main.humidity}%
				</Col>
				<Col>
					<GiPaperWindmill className="m-1" /> {data.resCurrent.wind.speed}m/s
				</Col>
				<Col>
                    <BsFillFunnelFill className="m-1" /> {data.resCurrent.main.pressure}Pa
                </Col>
			</ParameterWrap>
        </>
    );
};

export default Parameter;