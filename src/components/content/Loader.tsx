import { Suspense, useEffect, useState } from "react";
import { MyLoading } from "./MyLoading";
import { MotionDiv } from "./MotionDiv";

export const Loader = ({
  children,
  timeout = 0,
}: {
  children: React.ReactNode;
  timeout?: number;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Primero ocultamos el contenido y reiniciamos la animación
    setIsVisible(false);
    setIsAnimating(false);

    // Iniciamos el timeout para mostrar la animación
    const timer = setTimeout(() => {
      setIsAnimating(true); // Aquí empezamos la animación
    }, timeout);

    // Luego de que pase el timeout, hacemos visible el contenido
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, timeout + 100); // Pequeño retraso para mostrar el contenido luego de iniciar la animación

    window.scrollTo(0, 0);

    return () => {
      clearTimeout(timer);
      clearTimeout(visibilityTimer);
    };
  }, [children, timeout]);

  return (
    <Suspense fallback={<MyLoading />}>
      {/* Si ya pasó el timeout y está visible, mostrar con animación */}
      {isAnimating && (
        <MotionDiv
          className={isVisible ? "block" : "hidden"}
          animation="slideFade"
        >
          {children}
        </MotionDiv>
      )}

      {/* Mientras no pase el timeout, mostramos el loading */}
      {!isAnimating && <MyLoading />}
    </Suspense>
  );
};
