import Parameter from "./Parameter";
import Temperature from "./Temperature";
import HistoryWeekly from "./HistoryWeekly";

const Main = props => {
	return (
		<>
			<Temperature {...props} />
			<Parameter {...props} />
            <HistoryWeekly {...props}/>
		</>
	);
};
export default Main;
