import Swal from "sweetalert2";
import NavbarExample from "../components/Navbar/Navbar";
import Welcome from "../components/Welcome/Welcome";
import AlltheBooks from "../components/AlltheBooks/AlltheBooks";
import Footer from "../components/Footer/Footer";
import AddBook from "../components/AddBook/AddBook";
import {useSession} from "../hooks/usesession";

const FirstPage = () => {
  const session = useSession();
  console.log(session);

  const showAlert = () => {
    Swal.fire({
      title: "Benvenuto!",
      text: "Questo è il mio EbookStore.",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <NavbarExample />
      <AddBook />
      <Welcome showAlert={showAlert} title="Benvenuto nella mia applicazione" />
      <AlltheBooks />
      <Footer delay={3000} />
    </>
  );
};

export default FirstPage;
