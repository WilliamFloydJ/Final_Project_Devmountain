import axios from "axios";

async function isLoggedIn() {
  const res = await axios.get("/api/session");
  if (res.data.user) {
    return true;
  } else {
    return false;
  }
}

export default isLoggedIn;
