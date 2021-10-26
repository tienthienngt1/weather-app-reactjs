import {Row, Col} from "react-bootstrap";
import styled from "styled-components";

const HistoryWeeklyWrap = styled(Row)`
    .col{
        text-align: center;
    }
`

const HistoryWeekly = props => {
    console.log(props);
    const array = [
    { day: "Mon", image: "https://openweathermap.org/img/wn/04d.png", tempareture: 230}, 
    { day: "Tue", image: "https://openweathermap.org/img/wn/04d.png", tempareture: 230}, 
    { day: "Wed", image: "https://openweathermap.org/img/wn/04d.png", tempareture: 230}, 
    { day: "Thu", image: "https://openweathermap.org/img/wn/04d.png", tempareture: 230}, 
    { day: "Fri", image: "https://openweathermap.org/img/wn/04d.png", tempareture: 230}, 
    { day: "Sat", image: "https://openweathermap.org/img/wn/04d.png", tempareture: 230}, 
    { day: "Sun", image: "https://openweathermap.org/img/wn/04d.png", tempareture: 230}, 
    ];
    return (
        <HistoryWeeklyWrap>
            {
                array.map(data => (
                    <Col key={data.day}>
                        <div>{data.day}</div>
                        <div>
                            <img src={data.image} alt="" width="100%"/>
                        </div>
                        <div>
                            {data.tempareture}
                        </div>
                    </Col>
                ))
            }
        </HistoryWeeklyWrap>
    );
};

export default HistoryWeekly;