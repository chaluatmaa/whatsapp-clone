import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import "./SidebarChat.css";
import db from "./firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";

function SidebarChat({ addnewChat, id, name, timestamp }) {
	const [seed, setSeed] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	const createChat = (e) => {
		const roomName = prompt("Enter Room name");

		if (roomName) {
			// do some clever stuff
			db.collection("rooms").add({
				name: roomName,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		}
	};

	useEffect(() => {
		if (id) {
			db.collection("rooms")
				.doc(id)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) =>
					setMessage(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [id]);

	return !addnewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className="sidebarChat">
				<Avatar
					className="avatar"
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className="sidebarChat__info">
					<h3>{name}</h3>
					<h5>{timestamp}</h5>
					<p> {message[0]?.message} </p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className="sidebarChat">
			<h2>Add New Chat</h2>
		</div>
	);
}

export default SidebarChat;
