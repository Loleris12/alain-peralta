import "./HoloCard.css";

type HoloCardProps = {
  imageSrc: string;
  alt?: string;
};

export default function HoloCard({ imageSrc, alt = "" }: HoloCardProps) {
  return (
    <div className="holo-card" aria-label={alt}>
      <img className="holo-card__image" src={imageSrc} alt={alt} />
      <div className="holo-card__foil" aria-hidden="true" />
      <div className="holo-card__shine" aria-hidden="true" />
      <div className="holo-card__frame" aria-hidden="true" />
    </div>
  );
}

