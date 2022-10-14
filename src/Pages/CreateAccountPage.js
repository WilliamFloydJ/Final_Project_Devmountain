import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import CreateAccount from "../Components/Account/CreateAccount";

import "../Css/Account.css";

function CreateAccountPage() {
  return (
    <div className="backgroundColor ">
      <Header />
      <CreateAccount />
      <Footer />
    </div>
  );
}

export default CreateAccountPage;
