import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { navLinks } from "../../dataSource/DataSource";
import { ChatbubblesOutline, ExitOutline, ReloadOutline } from "react-ionicons";
import { DarkModeContext } from "../../contexts/DarkModeContext";

const Footer = ({ delay }) => {
  const [visible, setVisible] = useState(false);

  const { isDark } = useContext(DarkModeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <>
      {visible && (
        <footer className={`footer p-4 ${isDark ? "bg-dark text-white" : ""}`}>
          <Container>
            <Row>
              <Col>
                <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                  <div>
                    <h2>Ebook Store</h2>
                  </div>
                  <div className="d-flex gap-3">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        className={`nav-link ${isDark ? "text-white" : ""}`}
                        href={link.href}
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                  <div className="d-flex gap-3 align-items-center justify-content-center">
                    <ChatbubblesOutline
                      color={"#00000"}
                      shake
                      title={"B"}
                      height="40px"
                      width="40px"
                    />
                    <ReloadOutline
                      color={"#00000"}
                      rotate
                      title={"B"}
                      height="40px"
                      width="40px"
                    />
                    <ExitOutline
                      color={"#00000"}
                      beat
                      title={"B"}
                      height="40px"
                      width="40px"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      )}
    </>
  );
};

export default Footer;
