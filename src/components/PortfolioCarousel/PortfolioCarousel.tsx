import { useState } from "react";
import { portfolio } from "../../data/portfolio";
import "./PortfolioCarousel.css";

export function PortfolioCarousel() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (portfolio.length === 0) {
    return null;
  }

  const currentProject = portfolio[currentProjectIndex];
  const images = currentProject.images;
  const hasImages = images.length > 0;
  const currentImage = images[currentImageIndex];
  const isVideo = currentImage?.toLowerCase().endsWith(".mp4") ?? false;

  function goToProject(index: number) {
    const nextIndex =
      (index + portfolio.length) % portfolio.length;

    setCurrentProjectIndex(nextIndex);
    setCurrentImageIndex(0);
  }

  function goToPreviousProject() {
    goToProject(currentProjectIndex - 1);
  }

  function goToNextProject() {
    goToProject(currentProjectIndex + 1);
  }

  function goToImage(index: number) {
    if (images.length === 0) return;

    const nextIndex = (index + images.length) % images.length;
    setCurrentImageIndex(nextIndex);
  }

  function goToPreviousImage() {
    goToImage(currentImageIndex - 1);
  }

  function goToNextImage() {
    goToImage(currentImageIndex + 1);
  }

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__container">
        <header className="portfolio__header">
          <span className="portfolio__eyebrow">
            Portfólio
          </span>

          <h2 className="portfolio__heading">
            Projetos &amp; criações
          </h2>

          <p className="portfolio__subtitle">
            Uma seleção de projetos que expressam
            ideias, referências e identidade através da moda.
          </p>
        </header>

        <article
          className="portfolio__project"
          aria-label={`Projeto ${currentProjectIndex + 1}: ${currentProject.title}`}
        >
          
        <div className="portfolio__gallery">
            <div className="portfolio__image-wrapper">
                <button
                className="portfolio__image-arrow portfolio__image-arrow--previous"
                type="button"
                onClick={goToPreviousImage}
                disabled={images.length <= 1}
                aria-label="Fotografia anterior"
                >
                <span aria-hidden="true">←</span>
                </button>

                <div className="portfolio__image-frame">
                    {hasImages ? (
                    isVideo ? (
                        <video
                        key={`${currentProject.id}-${currentImageIndex}`}
                        className="portfolio__image"
                        src={currentImage}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-label={`${currentProject.title} — vídeo ${currentImageIndex + 1}`}
                        />
                    ) : (
                        <img
                        key={`${currentProject.id}-${currentImageIndex}`}
                        className="portfolio__image"
                        src={currentImage}
                        alt={
                            currentProject.imageAlts?.[currentImageIndex] ??
                            `${currentProject.title} — fotografia ${currentImageIndex + 1}`
                        }
                        draggable={false}
                        />
                    )
                    ) : (
                    <div className="portfolio__image-placeholder">
                        Fotografias deste projeto em breve
                    </div>
                    )}
                </div>

                <button
                className="portfolio__image-arrow portfolio__image-arrow--next"
                type="button"
                onClick={goToNextImage}
                disabled={images.length <= 1}
                aria-label="Próxima fotografia"
                >
                <span aria-hidden="true">→</span>
                </button>
            </div>

            {images.length > 0 && (
                <div className="portfolio__image-navigation">
                <span className="portfolio__image-counter" aria-live="polite">
                    {String(currentImageIndex + 1).padStart(2, "0")}
                    <span> / </span>
                    {String(images.length).padStart(2, "0")}
                </span>

                <div
                    className="portfolio__image-dots"
                    aria-label="Selecionar fotografia"
                >
                    {images.map((image, index) => (
                    <button
                        key={`${currentProject.id}-${image}-${index}`}
                        className={`portfolio__image-dot ${
                        index === currentImageIndex ? "is-active" : ""
                        }`}
                        type="button"
                        onClick={() => goToImage(index)}
                        aria-label={`Ver fotografia ${index + 1}`}
                        aria-pressed={index === currentImageIndex}
                    />
                    ))}
                </div>
                </div>
            )}
            </div>
            
            <div className="portfolio__project-info">
            <span className="portfolio__project-number">
                PROJETO {String(currentProjectIndex + 1).padStart(2, "0")}
            </span>

            <h3 className="portfolio__project-title">
                {currentProject.title}
            </h3>

            <p className="portfolio__project-description">
                {currentProject.description}
            </p>

            <div className="portfolio__project-navigation">
                <button
                className="portfolio__project-arrow"
                type="button"
                onClick={goToPreviousProject}
                aria-label="Projeto anterior"
                >
                <span aria-hidden="true">←</span>
                <span>Anterior</span>
                </button>

                <span className="portfolio__project-counter" aria-live="polite">
                {String(currentProjectIndex + 1).padStart(2, "0")}
                <span> / </span>
                {String(portfolio.length).padStart(2, "0")}
                </span>

                <button
                className="portfolio__project-arrow"
                type="button"
                onClick={goToNextProject}
                aria-label="Próximo projeto"
                >
                <span>Próximo</span>
                <span aria-hidden="true">→</span>
                </button>
            </div>
            </div>
        </article>

        <nav
          className="portfolio__project-indicators"
          aria-label="Selecionar projeto"
        >
          {portfolio.map((project, index) => (
            <button
              key={project.id}
              className={`portfolio__project-indicator ${
                index === currentProjectIndex ? "is-active" : ""
              }`}
              type="button"
              onClick={() => goToProject(index)}
              aria-current={index === currentProjectIndex ? "true" : undefined}
            >
              <span className="portfolio__indicator-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="portfolio__indicator-title">
                {project.title}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}