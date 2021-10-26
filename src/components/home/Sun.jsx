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
						`https://api.openweathermap.org/data/2.5/weather?q=${onSearch}&units=metric&lang=en&appid=${KEY}`
					)
					.then((res) => {
                        const resCurrent = res.data;
						let resHistory = [];
						for (let i = 1; i <= 5; i++) {
							if (i === 1 || i === 3 || i === 5) {
								axios
									.get(
										`https://api.openweathermap.org/data/2.5/onecall/timemachine?units=metric&lat=${
											res.data.coord.lat
										}&lon=${res.data.coord.lon}&dt=${
											res.data.dt - 24 * 60 * 60 * i
										}&appid=${KEY}`
									)
									.then((res) => {
										resHistory.push(
											res.data.hourly[23],
											res.data.hourly[0],
										);
										console.log(resHistory);
										if (i === 5) {
                                            setIsLoad(false);
                                            setResult({resCurrent,resHistory})
                                        } 
									})
									.catch((err) => {
										setIsLoad(false);
										setResult("");
										console.log(err);
									});
							}
						}
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
							if (!result) {
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
						onClick={() => {
							setData(data);
							setIsDisplay(false);
						}}
					>
						{data.resCurrent.name}, {data.resCurrent.sys.country}: {data.resCurrent.main.temp}°C,{" "}
						{data.resCurrent.main.humidity}%, {data.resCurrent.wind.speed}m/s
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
