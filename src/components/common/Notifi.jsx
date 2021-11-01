import { Spinner, Toast, Button } from "react-bootstrap";
import styled from "styled-components";

const WrapNotifi = styled.div`
	margin-top: 10px;
	padding: 10px;
	position: fixed;
	top: 8%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: fromTop 0.3s ease-in-out;
`;

const Notifi = (props) => {
	return (
		<>
			<WrapNotifi>
				{props.loading ? (
					<Button disabled>
						<Spinner
							as="span"
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
						/>
						Loading...
					</Button>
				) : (
					<Toast
						autohide
						delay={3000}
						variant={props.variant}
						bg={props.variant}
					>
						<Toast.Body>{props.message}</Toast.Body>
					</Toast>
				)}
			</WrapNotifi>
		</>
	);
};

export default Notifi;
