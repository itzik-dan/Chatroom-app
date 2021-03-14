import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Avatar, IconButton, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import SidebarChat from "./sidebarChat/SidebarChat.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db, auth } from "../../firebase";

// Matrial ui modal template
const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

// Matrial ui modal template
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  // on component mount fetch chat rooms names
  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addChat = () => {
    // add new chat to firebase
    if (input) {
      db.collection("chats").add({
        chatName: input,
      });
    }
    setOpen(false);
    setInput("");
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="modal">
            <TextField
              className="modal__input"
              placeholder="Add room name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton type="submit" onClick={addChat}>
              <AddIcon />
            </IconButton>
          </form>
        </div>
      </Modal>
      <div className="sidebar">
        <div className="sidebar__header">
          <div className="logout" onClick={() => auth.signOut()}>
            <Avatar src={user.photo} className="sidebar__avatar" />
            <small>Logout</small>
          </div>
          <div className="sidebar__create" onClick={(e) => setOpen(true)}>
            <AddIcon style={{ paddingRight: "10px" }} /> Create room
          </div>
        </div>

        <div className="sidebar__chats">
          {chats.map(({ id, data: { chatName } }) => (
            <SidebarChat key={id} id={id} chatName={chatName} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
