import {Row, Col} from "react-bootstrap";
import styled from "styled-components";
import { IoMdWater } from "react-icons/io";
import { GiPaperWindmill } from "react-icons/gi";
import {BsFillFunnelFill} from "react-icons/bs";

const ParameterWrap = styled(Row)`
    padding: 20px 0;
    font-size: 20px;
    border: 1px solid red;
    .col{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;



const Parameter = () => {
    return (
        <>
            <ParameterWrap>
				<Col>
					<IoMdWater className="m-1" /> 20%
				</Col>
				<Col>
					<GiPaperWindmill className="m-1" /> 2.9m/s
				</Col>
				<Col>
                    <BsFillFunnelFill className="m-1" /> 320Pa
                </Col>
			</ParameterWrap>
        </>
    );
};

export default Parameter;