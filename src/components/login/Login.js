import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";

import "./login.css";

// google sign in method powered by firebase auth system
const Login = () => {
  const signin = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://previews.123rf.com/images/kppwc/kppwc1905/kppwc190500151/125231437-chat-message-icon-speech-bubble-icon-vector.jpg"
          alt=""
        />
      </div>
      <h1 style={{ color: "white", fontSize: "80px" }}>Itzik's Chatrooms</h1>
      <Button onClick={signin}>Sign In</Button>
    </div>
  );
};

export default Login;
