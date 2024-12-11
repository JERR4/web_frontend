import { FC } from "react";
import "./PartCard.css";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {addPartToShipment} from "../../store/slices/partsSlice.ts";
import { T_Part } from "../../modules/types.ts";

const defaultImage = "/web_frontend/images/DefaultImage.webp";

interface PartCardProps {
  part: T_Part,
  imageClickHandler: () => void
  onAddToDraft: () => void;
}

export const PartCard: FC<PartCardProps> = ({
  part,
  imageClickHandler,
  onAddToDraft,
}) => {
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector((state) => state.user.is_authenticated);

  const handeAddToDraftShipment= async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    await dispatch(addPartToShipment(part.id.toString()));
    onAddToDraft();
  }

  return (
    <div className="part-card" onClick={imageClickHandler}>
      <img
        className="part-photo"
        src={part.image || defaultImage}
        alt="Part Image"
        onClick={imageClickHandler}
      />
      <div className="part-details">
        <h5 className="card-title">{part.part_name}</h5>
        <p className="card-text">
          <strong>Спецификация:</strong> {part.specification}
        </p>
        <p className="card-text">
          <strong>OEM Номер:</strong> {part.oem_number}
        </p>
        <div className="add-section">
          {isAuthenticated ? (
            part.active_add ? (
              <button
                className="btn btn-outline-dark btn-sm min-width-button"
                type="button"
                onClick={handeAddToDraftShipment}
              >
                Добавить
              </button>
            ) : (
              <button
                className="btn btn-outline-dark btn-sm min-width-button"
                type="button"
                disabled
              >
                Добавлено
              </button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

