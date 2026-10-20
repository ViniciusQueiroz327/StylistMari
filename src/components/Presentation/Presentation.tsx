import { stylist } from "../../data/stylist";
import "./Presentation.css";

export function Presentation() {
  return (
    <section className="presentation" id="sobre">
      <div className="presentation__container">
        <div className="presentation__content">
          <h1 className="presentation__title">
            Prazer,
            <br />
            sou <span>{stylist.name}.</span>
          </h1>

          <span className="presentation__eyebrow">
            {stylist.role}
          </span>
          
          <p className="presentation__introduction">
            {stylist.introduction}
          </p>

          <div className="presentation__details">
            {stylist.details.map((detail) => (
              <div
                className="presentation__detail"
                key={detail.label}
              >
                <span className="presentation__detail-label">
                  {detail.label}
                </span>

                <span className="presentation__detail-value">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          <span className="presentation__signature">
            Moda · Identidade · Expressão
          </span>
        </div>

        <div className="presentation__visual">
          {stylist.photo ? (
            <img
              className="presentation__photo"
              src={stylist.photo}
              alt={stylist.photoAlt}
            />
          ) : (
            <div
              className="presentation__photo-placeholder"
              role="img"
              aria-label="Espaço reservado para a fotografia da estilista"
            >
              <span>Fotografia</span>
              <span>em breve</span>
            </div>
          )}

          <span className="presentation__visual-caption">
            A creative journey
          </span>
        </div>
      </div>
    </section>
  );
}
