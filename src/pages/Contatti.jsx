import React, { useState } from "react";
import NavbarExample from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Contatti = () => {
  const [recipient, setRecipient] = useState("waino.marvin@ethereal.email");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailData = { recipient, email, text };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/SendEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Email inviata con successo!");
      } else {
        setMessage(result.message || "Errore durante l'invio dell'email.");
      }
    } catch (error) {
      setMessage("Si è verificato un errore durante l'invio dell'email.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavbarExample />
      <div>
        <h1 className="d-flex justify-content-center fs-1 mt-3">Contatti</h1>
        <p className="d-flex justify-content-center align-items-center fs-5 text-center px-5 mt-3">
          Informazioni: info@ebookecm.it Assistenza utenti:
          assistenza@ebookecm.it Editori, Provider ECM e Partnership:
          sviluppo@ebookecm.it Associazioni, Ordini, Aziende e Organizzazioni
          sanitarie: convenzioni@ebookecm.it Ebookecm.it è un progetto ideato e
          realizzato da: Bookia srl Servizi di Editoria Accreditata Sede legale:
          Piazza Deffenu 12 - 09125 Cagliari P.I. 03787400922 - Iscrizione CCIAA
          Cagliari n. 297530 info@bookia.it
        </p>
        <h2 className="px-5 mt-5">Ci hanno già scelto:</h2>
        <div className="container">
          <div className="row mt-5 d-flex justify-content-center align-items-center spaceAll">
            <div className="col-6 col-md-3 text-center">
              <img
                src="https://static0.ebookecm.it/img/partner/bmj.webp"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-6 col-md-3 text-center">
              <img
                src="https://static0.ebookecm.it/img/partner/springer_healthcare_vert.webp"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-6 col-md-3 text-center">
              <img
                src="https://static0.ebookecm.it/img/partner/hogrefe.webp"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-6 col-md-3 text-center">
              <img
                src="https://static0.ebookecm.it/img/partner/Armando.webp"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        <h3 className="d-flex justify-content-center mt-5">Contattaci</h3>
        <div className="row d-flex justify-content-center w-100">
          <div className="col-12 p-0">
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center"
            >
              <input
                className=" InputEmail mt-4 "
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                className="MessageInput "
                placeholder="Messaggio"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              {isLoading ? (
                <p>Invio in corso...</p>
              ) : (
                <button className="btn btn-primary mt-3 mb-4" type="submit">
                  Invia
                </button>
              )}
              {message && <p>{message}</p>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contatti;
