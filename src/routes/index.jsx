import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/home";

const routeList = [
    {path: "/", comp: Home}
]

const Routes = () => {
    return (
        <Router>
            <Switch>
                {
                    routeList.map(data => (
                        <Route exact path={data.path} component={data.comp} />
                    ))
                }
            </Switch>
        </Router>
    )
}

export default Routes