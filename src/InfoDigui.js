import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import image1 from './informacion.jpg';  // Imagen para la primera página
import image2 from './mision.jpg';       // Imagen para la segunda página
import image3 from './vision.jpg';       // Imagen para la tercera página
import star from './star.png';           // Imagen de estrella
import triangle from './triangle.png';   // Imagen de triángulo
import circle from './circle.png';       // Imagen de círculo

// Estilos generales con fuentes aplicadas
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #e0f7fa, #f3e5f5); /* Gradiente más suave */
  position: relative;
  overflow: hidden;

  /* Añadimos formas geométricas como estrellas, triángulos y círculos */
  &::before, &::after {
    content: '';
    position: absolute;
    z-index: 0;
  }

  &::before {
    background-image: url(${star});
    width: 100px;
    height: 100px;
    top: 10%;
    left: -50px;
    transform: rotate(15deg);
  }

  &::after {
    background-image: url(${triangle});
    width: 150px;
    height: 150px;
    bottom: -50px;
    right: -50px;
    transform: rotate(-30deg);
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  z-index: 0;
  opacity: 0.4;
  pointer-events: none; /* Desactiva interacciones del ratón */
`;

const ImageContainer = styled.div`
  width: 80vw;
  height: 40vh;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Asegura que la imagen esté sobre las formas */
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TextContainer = styled(motion.div)`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1;
`;

const Title = styled.h2`
  font-family: 'Baloo 2', cursive;  /* Fuente Baloo */
  font-size: 30px;  /* Encabezado con +30pt */
  color: #6b21a8;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-family: 'Quicksand', sans-serif;  /* Fuente Quicksand */
  font-size: 16px;  /* Texto de cuerpo con +10pt */
  color: #333;
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Dot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => (props.active ? "#6b21a8" : "#ccc")};
  margin: 0 8px;
  cursor: pointer;
`;

const NextButton = styled.button`
  background-color: #6b21a8;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 50%;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #5a189a;
  }
`;

// Animaciones para imágenes y textos
const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } },
};

const InfoDigui = ({ onFinish }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      image: image1,
      title: "¿Qué es DIGUI?",
      text: "DIGUI es una marca de juguetes didácticos en la que su diseño está a cargo de una profesional Psicopedagoga, en colaboración con un equipo multidisciplinario de profesionales del área tecnológica.",
    },
    {
      image: image2,
      title: "Misión de DIGUI",
      text: "Nuestra misión es fomentar una educación divertida y guiada para niños, ayudando en su crecimiento cognitivo y emocional a través de juguetes diseñados para aprender jugando.",
    },
    {
      image: image3,
      title: "Visión de DIGUI",
      text: "La visión de DIGUI es ser una referencia en el mercado de juguetes educativos, desarrollando productos innovadores que apoyen el aprendizaje en los primeros años de vida escolar.",
    },
  ];

  // Función para avanzar a la siguiente página o llamar a onFinish
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onFinish();  // Cuando llegamos a la última página, mostramos la pantalla de login
    }
  };

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <Container>
      {/* Imágenes de fondo adicionales */}
      <BackgroundImage src={circle} alt="Circle Shape" style={{ top: '5%', left: '80%', width: '150px' }} />
      <BackgroundImage src={star} alt="Star Shape" style={{ top: '50%', left: '5%', width: '100px' }} />
      <BackgroundImage src={triangle} alt="Triangle Shape" style={{ bottom: '5%', right: '10%', width: '120px' }} />

      {/* Contenedor de la imagen con animación */}
      <ImageContainer>
        <Image
          src={pages[currentPage].image}
          alt={pages[currentPage].title}
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          key={pages[currentPage].image}
        />
      </ImageContainer>

      {/* Contenedor del texto con animación */}
      <TextContainer
        initial="hidden"
        animate="visible"
        variants={textVariants}
        key={pages[currentPage].title}
      >
        <Title>{pages[currentPage].title}</Title>
        <Text>{pages[currentPage].text}</Text>
      </TextContainer>

      {/* Puntos de paginación */}
      <PaginationDots>
        {pages.map((_, index) => (
          <Dot
            key={index}
            active={index === currentPage}
            onClick={() => handlePageClick(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </PaginationDots>

      {/* Botón para avanzar a la siguiente página */}
      <NextButton onClick={handleNext}>→</NextButton>
    </Container>
  );
};

export default InfoDigui;
