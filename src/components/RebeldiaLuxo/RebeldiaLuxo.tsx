import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { rebeldiaLuxo } from "../../data/rebeldiaLuxo";
import "./RebeldiaLuxo.css";

export function RebeldiaLuxo() {
  const [currentPage, setCurrentPage] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef<number | null>(null);

  const images = rebeldiaLuxo.images;
  const currentImage = images[currentPage];

  function goToNextPage() {
    setCurrentPage((page) =>
      Math.min(page + 1, images.length - 1),
    );
  }

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(page - 1, 0));
  }

  function handlePointerDown(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (event.button !== 0) return;

    dragStartX.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (dragStartX.current === null) return;

    setDragX(event.clientX - dragStartX.current);
  }

  function handlePointerUp(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (dragStartX.current === null) return;

    const distance = event.clientX - dragStartX.current;

    if (distance < -60) {
      goToNextPage();
    } else if (distance > 60) {
      goToPreviousPage();
    }

    dragStartX.current = null;
    setDragX(0);
    setIsDragging(false);
  }

  function handlePointerCancel() {
    dragStartX.current = null;
    setDragX(0);
    setIsDragging(false);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNextPage();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPreviousPage();
    }
  }

  const rotation = Math.max(-18, Math.min(18, dragX * -0.06));

  return (
    <section className="rebeldia-luxo" id="rebeldia-luxo">
      <div className="rebeldia-luxo__container">
        <header className="rebeldia-luxo__header">
          <span className="rebeldia-luxo__eyebrow">
            Editorial de moda
          </span>

          <h2 className="rebeldia-luxo__title">
            {rebeldiaLuxo.title}
          </h2>

          <span
            className="rebeldia-luxo__title-line"
            aria-hidden="true"
          />
        </header>

        <div className="rebeldia-luxo__content">
          <div className="rebeldia-luxo__description">
            <span className="rebeldia-luxo__description-number">
              01 — EDITORIAL
            </span>

            <p>{rebeldiaLuxo.description}</p>

            <span className="rebeldia-luxo__hint">
              Arraste para folhear
              <span aria-hidden="true"> ↔</span>
            </span>
          </div>

          <div className="rebeldia-luxo__viewer">
            <div
              className={`rebeldia-luxo__page ${
                isDragging ? "is-dragging" : ""
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="group"
              aria-label={`Página ${currentPage + 1} de ${images.length}. Use as setas do teclado para folhear.`}
            >
              <img
                className="rebeldia-luxo__image"
                src={currentImage}
                alt={`Página ${currentPage + 1} do editorial Rebeldia Vira Luxo`}
                draggable={false}
                style={{
                    transform: `translateX(${dragX * 0.18}px) rotate(${rotation * 0.15}deg)`,
                }}
              />
            </div>

            <div className="rebeldia-luxo__controls">
              <button
                className="rebeldia-luxo__arrow"
                type="button"
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                aria-label="Página anterior"
              >
                <span aria-hidden="true">←</span>
              </button>

              <span
                className="rebeldia-luxo__counter"
                aria-live="polite"
              >
                {String(currentPage + 1).padStart(2, "0")}
                <span> / </span>
                {String(images.length).padStart(2, "0")}
              </span>

              <button
                className="rebeldia-luxo__arrow"
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === images.length - 1}
                aria-label="Próxima página"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}