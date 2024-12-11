import { FC } from "react";
import { useState } from "react";
import { T_Part } from "../../modules/types.ts";
import { useAppDispatch } from "../../store/store.ts";
import { removePartFromDraftShipment, updatePartValue } from "../../store/slices/shipmentsSlice.ts";
import "./ShipmentCard.css";

const defaultImage = "/web_frontend/images/DefaultImage.webp";

interface ShipmentCardProps {
  part: T_Part;
  showRemoveBtn?: boolean;
  editMM?: boolean;
}

export const ShipmentCard: FC<ShipmentCardProps> = ({
  part,
  showRemoveBtn = false,
  editMM = false,
}) => {
  const dispatch = useAppDispatch();
  const [local_quantity, setLocal_amount] = useState<string>(String(part.quantity));
  const [previousQuantity, setPreviousQuantity] = useState<string>(String(part.quantity));

  const handleRemoveFromDraftShipment = async () => {
    try {
        await dispatch(removePartFromDraftShipment(part.id.toString()));
    } catch (error) {
        console.error("Ошибка при удалении детали:", error);
    }
  };

  const handleBlur = () => {
    if (local_quantity === "") {
      setLocal_amount(previousQuantity);
      return;
    }

    dispatch(
      updatePartValue({
        part_id: part.id.toString(),
        quantity: Number(local_quantity),
      })
    );
    setPreviousQuantity(local_quantity); 
  };

  return (
    <div className="part-card">
      <img
        className="shipment-part-photo"
        src={part.image || defaultImage}
        alt="Part Image"
      />
      <div className="shipment-part-details">
        <div className="left-shipment-part-details">
          <h5 className="card-title">{part.part_name}</h5>
          <p className="card-text">
            <strong>Спецификация:</strong> {part.specification}
          </p>
          <p className="card-text">
            <strong>OEM Номер:</strong> {part.oem_number}
          </p>
        </div>
        <div className="shipment-quantity-row">
          <div className="quantity-label">Количество:</div>
          <div className="quantity-controls">
            <input
              type="number"
              className="form-control"
              min={1}
              value={local_quantity}
              onChange={(e) => {
                console.log("Введённое значение:", e.target.value);
                setLocal_amount(e.target.value);
              }}
              onBlur={handleBlur}
              disabled={!editMM}
            />
          </div>
          <div className="delete-button">
            {showRemoveBtn && (
                <button className = "btn btn-outline-dark" onClick={handleRemoveFromDraftShipment}>
                    Удалить
                </button>
            )}
        </div>
        </div>
      </div>
    </div>
  );
};
