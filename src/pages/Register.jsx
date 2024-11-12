import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    dob: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/create`,
        {
          method: "POST",
          headers: {
            authorization: JSON.parse(localStorage.getItem("Auth")),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      } else {
        alert("Errore nella registrazione. Riprova.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Errore nella registrazione. Riprova.");
    }
  };
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput
            wrapperClass="mb-4"
            label="Your Name"
            size="lg"
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Your Surname"
            size="lg"
            name="surname"
            id="surname"
            type="text"
            value={formData.surname}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Date of Birth "
            size="lg"
            name="dob"
            id="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Your Address"
            size="lg"
            name="address"
            id="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Your Email"
            size="lg"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            name="password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="d-flex flex-row justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="flexCheckDefault"
              label="I agree all statements in Terms of service"
            />
          </div>
          <MDBBtn
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            type="button"
            onClick={handleSubmit}
          >
            Register
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};
export default Register;
