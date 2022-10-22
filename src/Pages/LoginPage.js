import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import Login from "../Components/Account/Login";

import "../Css/Account.css";

function LoginPage() {
  return (
    <div className="backgroundColor">
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default LoginPage;
