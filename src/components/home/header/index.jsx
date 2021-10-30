import FormAndButton from "./FormAndButton";
import Logo from "./Logo";

const Header = props => {
    return (
        <>
            <Logo />
            <FormAndButton {...props} />
        </>
    );
};

export default Header;