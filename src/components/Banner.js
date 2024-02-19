import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Web Developer", "Web Designer"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const [paragraphText, setParagraphText] = useState("");

  const changeLanguage = (language) => {
    if (language === "english") {
      setParagraphText(
        "I am a developer with a foundation in web technologies such as JavaScript, HTML, CSS, React, Node.js, Express, Sequelize, and PostgreSQL. Driven by a passion for learning and problem-solving, I have acquired fundamental skills in web development and am eager to continue growing as a Full Stack Developer. Having worked on both personal and collaborative projects, I have gained valuable experience in teamwork and agile development. I am seeking an opportunity to be part of a team where I can contribute, learn, grow, and enhance my skills while building technological solutions."
      );
    } else if (language === "spanish") {
      setParagraphText(
        "Desarrollador con base en tecnologías web como JavaScript, HTML, CSS, React, Node.js, Express, Sequelize y PostgreSQL. Apasionado por el aprendizaje y la resolución de problemas, he adquirido habilidades fundamentales en el desarrollo web y estoy emocionado de seguir creciendo como Full Stack Developer. He trabajado en proyectos personales y colaborativos, lo que me ha permitido adquirir experiencia en el trabajo en equipo y el desarrollo ágil. Busco una oportunidad para formar parte de un equipo donde pueda contribuir, aprender, crecer y desarrollar mis habilidades mientras construyo soluciones tecnológicas."
      );
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>
                    {`Hi! I'm Chris`}{" "}
                    <span
                      className="txt-rotate"
                      dataPeriod="1000"
                      data-rotate='[ "Web Developer", "Web Designer" ]'
                    >
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p>{paragraphText}</p>
                  <button onClick={() => changeLanguage("english")}>
                    English bio
                  </button>
                  <button onClick={() => changeLanguage("spanish")}>
                    Español bio
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
