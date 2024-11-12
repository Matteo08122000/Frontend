import React from "react";
import NavbarExample from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ChiSiamo = () => {
  return (
    <>
      <NavbarExample />
      <div>
        <h1 className="d-flex justify-content-center mt-5">
          eBook PDF connette Lettori e Autori
        </h1>
        <p className="d-flex justify-content-center text-center px-5 fw-semibold Chi-siamo">
          Siamo una casa editrice digitale e offriamo la nostra casa virtuale a
          tutti gli Autori che abbiano l’esigenza di condividere con il mondo il
          proprio sapere. Nasce dall’idea di Matteo D'innocenzo, e dal desiderio
          e l’esigenza di condividere i propri ricettari, dando l’opportunità a
          chiunque avesse avuto voglia di provare le sue ricette. Praticamente
          tutti i nostri titoli sono in PDF, cioè scaricabili, non arriva nulla
          a casa: è una scelta Green per non avere spreco di carta, economica
          per avere prezzi contenuti per tutti e di comodità, per avere sempre
          con sè i manuali acquistati su smartphone o pc.
        </p>
        <h2 className="d-flex justify-content-start px-5 mt-5">
          Ecco alcuni nostri punti di forza
        </h2>
        <div className="container">
          <div className="row justify-content-center mb-5 mt-5">
            <div className="col-6 col-md-3">
              <img
                className="img-fluid"
                src="https://www.ebookpdf.it/wp-content/themes/ebookpdf_v_1.3.3/images/icons/icona_col-1.png"
                alt=""
              />
              <h3 className="d-flex justify-content-center fs-4">
                Accessibile a tutti
              </h3>
              <p className="d-flex justify-content-center text-center fs-6">
                Tutti possono acquistare e pubblicare sulla piattaforma. Ogni
                pubblicazione è catalogata sia per categoria sia per autore, per
                rendere facile la consultazione.
              </p>
            </div>
            <div className="col-6 col-md-3">
              <img
                className="img-fluid"
                src="https://www.ebookpdf.it/wp-content/themes/ebookpdf_v_1.3.3/images/icons/icona_col-2.png"
                alt=""
              />
              <h3 className="d-flex justify-content-center fs-4">
                "Libri" PDF
              </h3>
              <p className="d-flex justify-content-center text-center fs-6">
                Nel nostro catalogo trovi documenti pdf su svariati argomenti.
                Non arriva nulla a casa e in questo modo tuteliamo l'ambiente
                dallo spreco di carta
              </p>
            </div>
            <div className="col-6 col-md-3">
              <img
                className="img-fluid"
                src="https://www.ebookpdf.it/wp-content/themes/ebookpdf_v_1.3.3/images/icons/icona_col-3.png"
                alt=""
              />
              <h3 className="d-flex justify-content-center fs-4">
                Subito scaricabili
              </h3>
              <p className="d-flex justify-content-center text-center fs-6">
                I prodotti sono subito consultabili da qualsiasi dispositivo.
                Facilmente leggibili su telefono, pc e tablet senza l’uso di
                applicazioni aggiuntive. Li chiamiamo ebook per comodità, ma non
                serve kindle per la lettura
              </p>
            </div>
            <div className="col-6 col-md-3">
              <img
                className="img-fluid"
                src="https://www.ebookpdf.it/wp-content/themes/ebookpdf_v_1.3.3/images/icons/icona_col-4.png"
                alt=""
              />
              <h3 className="d-flex justify-content-center fs-4">
                Pagamento Sicuro
              </h3>
              <p className="d-flex justify-content-center text-center fs-6">
                Tutti i pagamenti sono fatti con sistemi sicuri. Si può
                scegliere di pagare attraverso Paypal, Satispay, Stripe e
                bonifico senza rischi per chi acquista.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChiSiamo;
