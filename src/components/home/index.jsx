import { useState } from "react";
import styled from "styled-components";
import cloud from "../../assets/cloud.jpg"
import sun from "../../assets/sun.png";
import rain from "../../assets/rain.jpg"
import "../home/indexCss.css"
import Header from "./header";
import Body from "./body";

const WrapSun = styled.div`
	background: url(${props => props.background});
	min-width: 410px;
	min-height: 100vh;
	background-size: cover;
	padding: ${(props) => props.padding};
`;

const Sun = () => {
	const [data, setData] = useState({
        isData: false,
        data: undefined
    });
    let bg;
    bg = data.data && (data.data.resHistory.sort((a,b) => a.dt - b.dt))[5].weather[0].main;
	return (
		<WrapSun padding="20px" background = {bg && bg === "Rain" ? rain : bg === "Clouds" ? cloud : sun}>
            <Header setData={setData} dataContainer={data}/>
			{data.isData && <Body data={data} />}
		</WrapSun>
	);
};

export default Sun;
