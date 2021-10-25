import { useEffect, useState } from "react";
import styled from "styled-components";
import {
	Spinner,
	Image,
	OverlayTrigger,
	Button,
	Form,
	FloatingLabel,
	Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import axios from "axios";
import logo from "../../assets/logo.png";
import sun from "../../assets/sun.png";
import { KEY } from "../../constants";
import Container from "./Container";

const HeaderSun = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	height: 60px;
	border: 1px solid red;
	.btn-circle {
		border-radius: 50%;
	}
	form {
		width: 70%;
	}
`;

const WrapSun = styled.div`
	background-image: url(${sun});
	width: 100vw;
	min-width: 410px;
	min-height: 100vh;
	background-size: cover;
	padding: ${(props) => props.padding};
`;

const WrapSearch = styled.div`
	width: 100%;
	padding: 10px;
	background: #fff;
	z-index: 2;
	.result__search {
		cursor: pointer;
		background: red;
	}
`;

const WrapInput = ({ setData, ...rest }) => {
	const [onSearch, setOnSearch] = useState("");
	const [isLoad, setIsLoad] = useState(false);
	const [isDisplay, setIsDisplay] = useState(false);
	const [result, setResult] = useState("");
	useEffect(() => {
		const delaySearch = setTimeout(() => {
			if (onSearch === "") {
				setIsLoad(false);
				setIsDisplay(false);
			} else {
				setIsLoad(true);
				setIsDisplay(true);
				// get data from openweather
				axios
					.get(
						`https://api.openweathermap.org/data/2.5/weather?q=${onSearch}&units=metric&lang=vi&appid=${KEY}`
					)
					.then((res) => {
						setResult(res.data);
						console.log(res);
						setIsLoad(false);
						// axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${KEY}`)
						// .then(res => {
						//     setIsLoad(false)
						//     console.log(res);
						// })
						// .catch(err => {
						//     setIsLoad(false)
						//     setResult('')
						// })
					})
					.catch((error) => {
						setIsLoad(false);
						setResult("");
					});
			}
		}, 1000);
		return () => clearTimeout(delaySearch);
	}, [onSearch, setData]);

	return (
		<>
			<Form onSubmit={(e) => e.preventDefault()}>
				<FloatingLabel
					controlId="floatingInput"
					label="Enter your city..."
				>
					<Form.Control
						type="text"
						onChange={(e) => setOnSearch(e.target.value)}
						onBlur={() => {
                            if(!result) {
                                setIsDisplay(false);
                            }
                        }}
						placeholder="Enter your city... "
					/>
				</FloatingLabel>
				{isDisplay ? (
					<ResultSearch
						load={isLoad}
						data={result}
						setData={setData}
						setIsDisplay={setIsDisplay}
					/>
				) : (
					""
				)}
			</Form>
		</>
	);
};

const ResultSearch = (props) => {
	const { load, data, setData, setIsDisplay } = props;
	console.log(data);
	return (
		<>
			<WrapSearch>
				{load ? (
					<center>
						<Spinner animation="border" variant="danger" />
					</center>
				) : data ? (
					<div
						className="result__search"
						onClick={() => {setData(data); setIsDisplay(false)}}
					>
						{data.name}, {data.sys.country}: {data.main.temp}°C,{" "}
						{data.main.humidity}%, {data.wind.speed}m/s
					</div>
				) : (
					<center>Not Found</center>
				)}
			</WrapSearch>
		</>
	);
};

const Sun = () => {
	const [data, setData] = useState("");
	console.log(data);
	return (
		<WrapSun padding="20px">
			<center>
				<Link to="/">
					<Image src={logo} width="70%" />
				</Link>
			</center>
			<HeaderSun>
				<WrapInput setData={setData} />
				<OverlayTrigger
					placement="bottom"
					overlay={<Tooltip>My Location</Tooltip>}
					delay={{ show: 300, hide: 300 }}
				>
					<Button className="btn-circle">
						<BiCurrentLocation size="30" />
					</Button>
				</OverlayTrigger>
			</HeaderSun>
			{data ? <Container data={data} /> : "Not Found"}
		</WrapSun>
	);
};

export default Sun;
