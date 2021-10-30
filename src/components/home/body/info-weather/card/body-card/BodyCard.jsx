import Temperature from "./Temperature";
import Parameter from "./Parameter";
import HistoryWeekly from "./HistoryWeekly";

const BodyCard = props => {
    return (
        <>
            <Temperature {...props} />
			<Parameter {...props} />
            <HistoryWeekly {...props}/>
        </>
    );
};

export default BodyCard;