import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../componentscss/addDestination.css";
import NavBar from "../NavBar";
import Footer from "../Footer";
import RotateLoaderComponent from "../Loaders/RotateLoaderComponent";
import Swal from "sweetalert2";  // Importa SweetAlert2


const NewDestinationsForm = () => {
  const [formState, setFormState] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("Authorization");

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const uploadFile = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("img", fileToUpload);

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/upload/cloud`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error.message);
      Swal.fire("Errore", "Caricamento del file fallito!", "error");  // Mostra errore in caso di fallimento
    } finally {
      setLoading(false);
    }
  };

  const submitDestination = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        setLoading(true);
        const uploadedFile = await uploadFile(file);
        if (!uploadedFile?.img) {
          Swal.fire("Errore", "Immagine non caricata correttamente!", "error");  // Se il file non è stato caricato correttamente
          return;
        }

        const postFormState = {
          ...formState,
          img: uploadedFile.img,
        };

        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postFormState),
          }
        );

        if (response.ok) {
          Swal.fire("Successo", "Destinazione aggiunta con successo! Riceverai un'email non appena l'admin avrà approvato la tua nuova destinazione. Ti ringraziamo per il tuo prezioso contributo", "success");  // Mostra successo
        } else {
          Swal.fire("Errore", "Qualcosa è andato storto!", "error");  // Se la risposta non è positiva
        }
      } catch (error) {
        console.log(error.message);
        Swal.fire("Errore", "C'è stato un problema nel creare la destinazione!", "error");  // Gestione errore generico
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire("Attenzione", "Devi caricare un'immagine!", "warning");  // Se l'immagine non è selezionata
    }
  };

  return (
    <>
      <NavBar />
      <Container className="my-5">
        {loading ? (
          <RotateLoaderComponent />
        ) : (
          <>
            <div className="image-header mb-4">
              <img
                src="https://www.triptherapy.net/images/easyblog_articles/535/ganapathy-kumar-7782WXBriyM-unsplash.jpg"
                alt="Add New Destination"
                className="img-fluid w-100"
              />
              <h1>Aggiungi una Nuova Destinazione</h1>
            </div>

            <Form encType="multipart/form-data" className="mt-4" onSubmit={submitDestination}>
              <Row className="d-flex align-items-center justify-content-center">
                <Col sm={12} md={8}>
                  <Row className="mb-3">
                    <Form.Group as={Col} sm={12} md={6} controlId="formName">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        onChange={onChangeInput}
                        type="text"
                        name="name"
                        placeholder="Inserisci il nome della destinazione"
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} sm={12} md={6} controlId="formLocation">
                      <Form.Label>Luogo</Form.Label>
                      <Form.Control
                        onChange={onChangeInput}
                        type="text"
                        name="location"
                        placeholder="Inserisci la località"
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formDescription">
                      <Form.Label>Descrizione</Form.Label>
                      <Form.Control
                        onChange={onChangeInput}
                        as="textarea"
                        name="description"
                        placeholder="Descrivi la destinazione"
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} sm={12} md={6} className="mb-3" controlId="formCategory">
                      <Form.Label>Categoria</Form.Label>
                      <Form.Control
                        onChange={onChangeInput}
                        type="text"
                        name="category"
                        placeholder="Inserisci la categoria"
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} sm={12} md={6} className="mb-3" controlId="formImages">
                      <Form.Label>Immagine</Form.Label>
                      <Form.Control
                        type="file"
                        name="img"
                        onChange={onChangeFile}
                        required
                      />
                    </Form.Group>
                  </Row>

                  <Button variant="primary" type="submit" className="mt-2">
                    Aggiungi Destinazione
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default NewDestinationsForm;
