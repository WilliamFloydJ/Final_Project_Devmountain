import axios from "axios";
import Header from "../Components/Layout/Header";
import Account from "../Components/Account/Account";
import Login from "../Components/Account/Login";

function AccountPage() {
  let loggedIn;

  axios.get("/api/session").then((res) => {
    if (res.data) {
      console.log(res.data);
    }
  });

  return (
    <div>
      <Header />
      {loggedIn ? <Account /> : <Login />}
    </div>
  );
}

export default AccountPage;
