import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { BiCurrentLocation } from "react-icons/bi";
import { requestHistoryWeather } from "../../../api/requestWeather";
import { requestCurrentWeatherByGeo } from "../../../api/requestWeather";

const ButtonLocation = (props) => {
	const handleButton = () => {
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
                    props.setIsData(false);
                    props.setData({resCurrent: resCurrent.data,resHistory})
                    props.setIsData(true);
				} else {
					alert("Error! Please try again!");
				}
			},
			(err) => {
				console.log(err);
				alert("You must enable website access your location!");
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
		</>
	);
};

export default ButtonLocation;
