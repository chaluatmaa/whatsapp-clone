import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
	const [{ user }, dispatch] = useStateValue(null);

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<div className="login__container">
				<img
					className="login__logo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/766px-WhatsApp.svg.png"
					alt="logo"
				/>
				<div className="login__text">
					<h1>Sign In To WHATSAPP</h1>
				</div>
				<Button onClick={signIn}>Sing In with Google</Button>
			</div>
		</div>
	);
}

export default Login;
