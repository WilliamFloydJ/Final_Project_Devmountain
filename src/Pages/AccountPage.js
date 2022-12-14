import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import Account from "../Components/Account/Account";

import "../Css/Account.css";

function AccountPage() {
  return (
    <div className="backgroundColor">
      <Header />
      <Account />
      <Footer />
    </div>
  );
}

export default AccountPage;
