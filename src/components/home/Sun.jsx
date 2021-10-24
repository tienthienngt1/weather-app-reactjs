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
	height: 100vh;
	background-size: cover;
	padding: ${(props) => props.padding};
`;

const WrapSearch = styled.div`
	width: 100%;
	padding: 10px;
	background: #fff;
	z-index: 2;
`;

const WrapInput = () => {
	const [onSearch, setOnSearch] = useState("");
	const [isLoad, setIsLoad] = useState(false);
	const [isDisplay, setIsDisplay] = useState(false);
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
						`https://api.openweathermap.org/data/2.5/weather?q=${onSearch}&appid=${KEY}`
					)
					.then(res => {
                        console.log(res);
                        const {lon, lat} = res.data.coord
                        console.log(lon,lat);
                        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${KEY}`)
                        .then(res => {
                            setIsLoad(false)
                            console.log(res);
                        })
                        .catch(err => {
                            setIsLoad(false)
                            console.log(err);
                        })
					})
                    .catch(error => {
                        setIsLoad(false)
                    })
			}
		}, 1000);
		return () => clearTimeout(delaySearch);
	}, [onSearch]);
	return (
		<Form onSubmit={e => e.preventDefault()} >
			<FloatingLabel controlId="floatingInput" label="Enter your city...">
				<Form.Control
					type="text"
					onChange={(e) => setOnSearch(e.target.value)}
					onBlur={() => setIsDisplay(false)}
					placeholder="Enter your city... "
				/>
			</FloatingLabel>
			{isDisplay ? <ResultSearch load={isLoad} /> : ""}
		</Form>
	);
};

const ResultSearch = (props) => {
	const { load } = props;
	return (
		<>
			<WrapSearch>
				<center>
					{load ? (
						<Spinner animation="border" variant="danger" />
					) : (
						"Not Found"
					)}
				</center>
			</WrapSearch>
		</>
	);
};

const Sun = () => {
	return (
		<WrapSun padding="20px">
			<center>
				<Link to="/">
					<Image src={logo} width="70%" />
				</Link>
			</center>
			<HeaderSun>
				<WrapInput />
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
		</WrapSun>
	);
};

export default Sun;
