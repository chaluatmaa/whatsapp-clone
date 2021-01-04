import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { useEffect } from "react";
import db, { auth } from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [{ user }, dispatch] = useStateValue(null);

	useEffect(() => {
		const unsubscribe = db
			.collection("rooms")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setRooms(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
						timestamp: doc.data.timestamp,
					}))
				)
			);
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar
					className="avatar"
					src={user?.photoURL}
					onClick={() => auth.signOut()}
				/>
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlinedIcon />
					<input placeholder="Search or start a new chat" />
				</div>
			</div>
			<div className="sidebar__chats">
				<SidebarChat addnewChat />
				{rooms.map((room) => (
					<SidebarChat key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
			{/* <div className="sidebar__chats">
				<SidebarChat addnewChat />
				{rooms.map(({ id, name }) => (
					<SidebarChat key={id} id={id} name={data.name} />

					name={data.name} == > Change to =====>>> name = {data().name}
				))}
			</div> */}
		</div>
	);
}

export default Sidebar;
