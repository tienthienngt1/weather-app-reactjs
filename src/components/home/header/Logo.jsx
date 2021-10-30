import {Link} from "react-router-dom"
import { Image } from "react-bootstrap";
import logo from "../../../assets/logo.png"

const Logo = () => {
    return (
        <center>
            <center style={{marginBottom: '30px'}}>
				<Link to="/">
					<Image src={logo} width="70%" />
				</Link>
			</center>
        </center>
    );
};

export default Logo;