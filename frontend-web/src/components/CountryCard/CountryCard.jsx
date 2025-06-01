import './CountryCard.css';

export default function CountryCard({ name, image, flag }) {
  return (
    <article className="country-card">
      <h3 className="country-card__name">{name}</h3>

      
      <div className="country-card__image-wrap">
        <img
          className="country-card__image"
          src={image}
          alt={`${name} scenery`}
        />

       
        <div className="country-card__flag">
          <img src={flag} alt={`${name} flag`} />
        </div>
      </div>
    </article>
  );
}