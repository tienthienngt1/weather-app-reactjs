import { useState } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { BiCurrentLocation } from "react-icons/bi";
import { requestHistoryWeather } from "../../../api/requestWeather";
import { requestCurrentWeatherByGeo } from "../../../api/requestWeather";
import Notifi from "../../common/Notifi";

const ButtonLocation = (props) => {
	const [notifi, setNotifi] = useState({
		status: false,
		message: "",
		variant: "",
	});
	const handleButton = () => {
		if (!navigator.onLine) {
			setNotifi({
				status: true,
				message: "Offline!",
				variant: "primary",
			});
			setTimeout(() => {
				setNotifi({
					status: false,
				});
			}, 3000);
			return;
		}
		setNotifi({
			status: true,
			loading: true,
		});
		navigator.geolocation.getCurrentPosition(
			async (res) => {
				const { latitude, longitude } = res.coords;
				const resCurrent = await requestCurrentWeatherByGeo(
					longitude,
					latitude
				);
				if (resCurrent.data) {
					let queryHistory;
					let resHistory = [];
					for (let i = 1; i <= 5; i++) {
						if (i === 1 || i === 3 || i === 5) {
							queryHistory = await requestHistoryWeather(
								resCurrent.data.coord.lon,
								resCurrent.data.coord.lat,
								resCurrent.data.dt - 24 * 60 * 60 * i
							);
							if (queryHistory.data) {
								resHistory.push(
									queryHistory.data.hourly[23],
									queryHistory.data.hourly[0]
								);
							}
						}
					}
					props.setData({
						isData: false,
                        data: { resCurrent: resCurrent.data, resHistory },
					});
					props.setData({
						isData: true,
						data: { resCurrent: resCurrent.data, resHistory },
					});
				} else {
					alert("Error! Please try again!");
				}
				setNotifi({
					status: false,
				});
			},
			(err) => {
				alert("You must enable website access your location!");
				setNotifi({
					status: false,
				});
			}
		);
	};
	return (
		<>
			<OverlayTrigger
				placement="bottom"
				overlay={<Tooltip>My Location</Tooltip>}
				delay={{ show: 300, hide: 300 }}
			>
				<Button className="btn-circle" onClick={handleButton}>
					<BiCurrentLocation size="30" />
				</Button>
			</OverlayTrigger>
			{notifi.status && (
				<Notifi
					message={notifi.message}
					loading={notifi.loading}
					variant={notifi.variant}
				/>
			)}
		</>
	);
};

export default ButtonLocation;
