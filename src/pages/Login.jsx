import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("Auth", JSON.stringify(data.token));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToGithub = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/github`;
  };

  const redirectToGoogle = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`;
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12 d-flex flex-column align-items-center">
            <div className="text-center mb-2">
              <img
                className="img-login mb-3"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAAD7+/v39/daWlrc3Ny+vr5QUFBfX19NTU2Tk5Ph4eEuLi7MzMykpKRpaWno6OgpKSkSEhLW1tZAQEAdHR2xsbFvb2/ExMTl5eWKiorx8fGampq6uroaGhqCgoJ4eHg4ODhGRkYkJCSqqqoNDQ05ImXfAAADhklEQVR4nO3ca1eiQACAYQbUVEQRUMFLUuj//4vLMFCWVHuaMQbO+3zYls04vA7ipZ1xHAAAAAAAAAAAAAAAAAAAAAAAAAA/cD0D3K4rvhYcd9ORvjzsOqSdt1wLQ3Zdt7TyR6b6hJjaeJ4GC3OBUdp1TYssUge3OG/j8a9luXgtf/zQdU0Ld6UC80xvP2uxNHNAxi1VoO7ZlYrC1stoUgVq3/97MTJxOA+QVoHa13hvZO1JOq8KY93dhGv9fTzITga+aj+JjUWheaV6FPdJFu619xOImY1PFE5TeNTez0SMPAOH8wCmCk9iZePLNacpzLX3M7G8MNE+utTys1T7FY0Ti8TqK43+AGSbZ9/IARlXF4qz5n4OM/3z4DGaQjHXHMWz9p30IG+FYqr3qutk4HL1EO+F5RV1f5r82rY8DdLUwjdQt4UGJKeug+4YLhQi6LroM+OFeddFnxkvfLLtemO8cEbhX6OQQgq7R+HAC/OgXT6YwvkXPzSn0CYUtqLQKhS2otAq/1l4Wd64TAdY+M2NKOwaj8NWFFqFwlYUWoXCVkMsdG8NsnD1QTLAwm9uNJDC3e0Q7oY4hh8N8XH4EYVWobAVhVahsNVwCs+Z3yY7D6bwedHueTCFv0Hhn6OQQgq7R+FPrlHvCqv5BG64rf492seec5jUvxGdx65zOMmNSM4AUlObd/0sLIWJEOt6oo8nX4gumo19U7gt/wh6OYbuRQbMb2e0TW83VqowkXfG7PNp24tCL5Gjk4tE3iDeyll3gRjJI49PakMWuhenmeveu0IndB1vqeY/jzdiVX45vMh3UuNrvXGVhV55X9z/n4V+FJbCvVpnYSvEphw377XeEE41E6+eaxjcBfaj0N2Oy+8c1RguqvUWwmoM/aLekGPo9HgMPZE7clGXhbxBlsqJiYE68ixQG9XjUE4AH/ez0KlWmYmj6ulAKS+Zbxvek7qWbuRI373d70dhJS8fgfVcO1d2FM1G3jwfykmj4UvvCgNfrhgUL9VvX6YT+fdCfWt1KjeOcs2sKPV9/3pN/XF27F1hsS4V17ftzfrmVcumiN5vJb9XfelZoS4K/xyFFFLYPQoppLB7FFJof+HdJ7rDK1wOvjA0tgq0YuFKyZPPn8vrsXEV0/vPrTXMrFx5z9vupmasLvadozUTS+rbvao+AAAAAAAAAAAAAAAAAAAAAAAA0Ll/CRFGsVcon8kAAAAASUVORK5CYII="
                alt="Logo"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <form className="form-login" onSubmit={onSubmit}>
              <input
                className="mt-2 w-100"
                onChange={handlerInput}
                name="email"
                type="email"
                placeholder="Email"
                style={{ maxWidth: "320px" }}
              />
              <input
                className="mt-2 w-100"
                onChange={handlerInput}
                name="password"
                type="password"
                placeholder="Password"
                style={{ maxWidth: "320px" }}
              />
              <button className="btn-login mt-3 w-100" type="submit">
                Login
              </button>
            </form>

            <span
              className="btn btn-primary mt-4 d-flex justify-content-center align-content-center"
              onClick={redirectToGithub}
            >
              <span>
                <svg
                  className="github-logo"
                  xmlns="http://www.w3.org/2000/svg"
                  xml:space="preserve"
                  viewBox="0 0 16 16"
                  id="github"
                >
                  <path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path>
                </svg>
              </span>
              Login with Github
            </span>

            <span
              className="btn btn-secondary mt-2 d-flex justify-content-center align-content-center"
              onClick={redirectToGoogle}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 256 262"
                  id="google"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
              </span>
              Login with Google
            </span>

            <span className="text-center mt-5">
              Se non sei registrato <Link to="/register">Registrati Qui</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
