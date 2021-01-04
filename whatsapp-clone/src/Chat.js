import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import { useHistory, useParams } from "react-router-dom";
import db, { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
	const [seed, setSeed] = useState("");
	const [input, setInput] = useState("");
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState("");
	const [{ user }, dispatch] = useStateValue(null);
	const history = useHistory();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (user) {
			history.push("/");
		}
	}, []);

	// useEffect(() => {
	// 	auth.onAuthStateChanged((authuser) => {
	// 		if (authuser) {
	// 			user(authuser);
	// 		} else {
	// 			user(null);
	// 		}
	// 	});
	// }, [dispatch]);

	useEffect(() => {
		if (roomId) {
			db.collection("rooms")
				.doc(roomId)
				.onSnapshot((snapshot) => setRoomName(snapshot.data().name));

			db.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		} else {
			history.push("/");
		}
	}, [roomId]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, [roomId]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (roomId) {
			db.collection("rooms").doc(roomId).collection("messages").add({
				message: input,
				name: user.displayName,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		}
		setInput("");
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>
						Last Seen at{" "}
						{new Date(
							messages[messages.length - 1]?.timestamp?.toDate()
						).toLocaleString()}{" "}
					</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{messages.map((message) => (
					<div
						className={`chat__message ${
							message.name === user.displayName && `chat__reciever`
						}`}
					>
						<p>
							{message.message}
							<span className="chat__name">{message.name.split(" ")[0]}</span>
							<span className="chat__timestamp">
								{new Date(message.timestamp?.toDate()).toLocaleString()}
							</span>
						</p>
					</div>
				))}
			</div>
			<div className="chat__footer">
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="chat__sendMessage"
						placeholder="Type a message"
						disabled={!roomId}
					/>
					<button
						onClick={sendMessage}
						type="submit"
						className="chat__button"
						disabled={!input}
					>
						Send message
					</button>
				</form>
				<IconButton>
					<MicIcon />
				</IconButton>
			</div>
		</div>
	);
}

export default Chat;
