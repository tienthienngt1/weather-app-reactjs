import { useEffect, useState } from "react";
import styled from "styled-components";
import { Spinner, Form, FloatingLabel } from "react-bootstrap";
import { requestHistoryWeather } from "../../../api/requestWeather";
import { requestCurrentWeather } from "../../../api/requestWeather";
import ButtonLocation from "./ButtonLocation";

const WrapSearch = styled.div`
	width: 100%;
	padding: 10px;
	background: #fff;
	z-index: 2;
	.result__search {
		cursor: pointer;
	}
`;

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
							if (props.dataContainer.isData) {
								setData({
                                    isData: false,
                                    data: data
                                });
							}
							setTimeout(() => {
                                setData({
                                    isData: true,
                                    data: data
                                })
							}, 300);
							setIsDisplay(false);
						}}
					>
						{data.resCurrent.name}, {data.resCurrent.sys.country}:{" "}
						{data.resCurrent.main.temp}°C,{" "}
						{data.resCurrent.main.humidity}%,{" "}
						{data.resCurrent.wind.speed}m/s
					</div>
				) : (
					<center>Not Found</center>
				)}
			</WrapSearch>
		</>
	);
};

const WrapInput = (props) => {
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
				(async () => {
					const res = await requestCurrentWeather(onSearch);
					if (res.data) {
						const resCurrent = res.data;
						let queryHistory;
						let resHistory = [];
						for (let i = 1; i <= 5; i++) {
							if (i === 1 || i === 3 || i === 5) {
								queryHistory = await requestHistoryWeather(
									resCurrent.coord.lon,
									resCurrent.coord.lat,
									resCurrent.dt - 24 * 60 * 60 * i
								);
								if (queryHistory.data) {
									resHistory.push(
										queryHistory.data.hourly[23],
										queryHistory.data.hourly[0]
									);
								} else {
									setIsLoad(false);
									setResult("");
								}
							}
							if (i === 5) {
								setIsLoad(false);
								setResult({
									resCurrent,
									resHistory,
								});
							}
						}
					} else {
						setIsLoad(false);
						setResult("");
					}
				})();
			}
		}, 1000);
		return () => clearTimeout(delaySearch);
	}, [onSearch]);

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
						{...props}
						load={isLoad}
						data={result}
						setIsDisplay={setIsDisplay}
					/>
				) : (
					""
				)}
			</Form>
		</>
	);
};

const WrapFormAndButton = styled.div`
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
const FormAndButton = (props) => {
	return (
		<>
			<WrapFormAndButton>
				<WrapInput {...props} />
				<ButtonLocation {...props} />
			</WrapFormAndButton>
		</>
	);
};

export default FormAndButton;
