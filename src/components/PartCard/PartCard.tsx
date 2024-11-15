import { FC } from "react";
import "./PartCard.css";
const defaultImage = "/images/DefaultImage.webp";

interface PartCardProps {
  part_name: string;
  specification: string;
  oem_number: string;
  image: string;
  imageClickHandler: () => void;
}

export const PartCard: FC<PartCardProps> = ({
  part_name,
  specification,
  oem_number,
  image,
  imageClickHandler,
}) => {
  return (
    <div className="part-card" onClick={imageClickHandler}>
      <img className="part-photo" src={image|| defaultImage} alt="Part Image" />
      <div className="part-details">
        <h5 className="card-title">{part_name}</h5>
        <p className="card-text">
          <strong>Спецификация:</strong> {specification}
        </p>
        <p className="card-text">
          <strong>OEM Номер:</strong> {oem_number}
        </p>
      </div>
    </div>
  );
};