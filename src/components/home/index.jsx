import { useState } from "react";
import styled from "styled-components";
import sun from "../../assets/sun.png";
import "../home/indexCss.css"
import Header from "./header";
import Body from "./body";

const WrapSun = styled.div`
	background-image: url(${sun});
	width: 100vw;
	min-width: 410px;
	min-height: 100vh;
	background-size: cover;
	padding: ${(props) => props.padding};
`;

const Sun = () => {
	const [data, setData] = useState("");
    const [isData, setIsData] = useState(false)
	return (
		<WrapSun padding="20px">
            <Header isData={isData} setData={setData} setIsData={setIsData} />
			{isData ? <Body data={data} /> : ""}
		</WrapSun>
	);
};

export default Sun;
