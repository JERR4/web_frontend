import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import { fetchShipments, T_ShipmentsFilters, updateFilters } from "../../store/slices/shipmentsSlice.ts";
import { useNavigate } from "react-router-dom";
import "./ShipmentsPage.css";
import { ROUTES } from "../../Routes.tsx";
import Footer from "../../components/footer/footer.tsx";

const ShipmentsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shipments = useAppSelector((state) => state.shipments.shipments);
  const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated);
  const filters = useAppSelector<T_ShipmentsFilters>((state) => state.shipments.filters);

  const [status, setStatus] = useState(filters.status);
  const [dateFormationStart, setDateFormationStart] = useState(filters.date_formation_start);
  const [dateFormationEnd, setDateFormationEnd] = useState(filters.date_formation_end);

  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const statusOptions = {
    0: "Любой",
    3: "Сформирован",
    4: "Завершен",
    5: "Отклонен",
  };

  const formatDate = (dateString?: string) => { 
    if (!dateString) return "";   
    const date = new Date(dateString); 
    return date.toLocaleDateString("ru-RU"); // Формат: день.месяц.год 
  }; 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.PAGE403);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  const applyFilters = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formatDate = (date: string) => {
      if (!date) return null;
      const d = new Date(date);
      return d.toISOString();
    };
    const newFilters: T_ShipmentsFilters = {
      status,
      date_formation_start: formatDate(dateFormationStart) || '',
      date_formation_end: formatDate(dateFormationEnd) || '',
    };

    await dispatch(updateFilters(newFilters));
    await dispatch(fetchShipments());
  };

  return (
    <div className="shipments-container">
        <div className="shipments-table-container">
            <form onSubmit={applyFilters} className="shipment-form">
                <div className="shipment-form-group">
                <label>От</label>
                <input
                    type="date"
                    value={dateFormationStart}
                    onChange={(e) => setDateFormationStart(e.target.value)}
                />
                </div>
                <div className="shipment-form-group">
                <label>До</label>
                <input
                    type="date"
                    value={dateFormationEnd}
                    onChange={(e) => setDateFormationEnd(e.target.value)}
                />
                </div>
                <div className="shipment-form-group">
                <label>Статус</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                >
                    {Object.entries(statusOptions).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                    ))}
                </select>
                </div>
                <div className="shipment-form-group">
                <button type="submit" className="btn btn-outline-dark">
                    Применить
                </button>
                </div>
            </form>

            <div className="table-container">
                {shipments.length > 0 &&
                    <table className="shipments-table">
                        <thead>
                        <tr>
                            <td>ID отправки</td>
                            <td>Статус</td>
                            <td>Дата создания</td>
                            <td>Дата формирования</td>
                            <td>Запланированная дата</td>
                            <td>Дата завершения</td>
                            <td>Создатель</td>
                            <td>Склад</td>
                            <td>Тип операции</td>
                            <td>Номер авто</td>
                        </tr>
                        </thead>
                        <tbody>
                        {shipments.map((shipment, index) => (
                            <tr
                            key={index}
                            className={shipment.id === hoveredRowId ? "hovered-row" : ""} 
                            onMouseEnter={() => setHoveredRowId(shipment.id)}
                            onMouseLeave={() => setHoveredRowId(null)}
                            onClick={() => navigate(`${ROUTES.SHIPMENTS}/${shipment.id}/`)}
                            >
                            <td>{shipment.id}</td>
                            <td>{statusOptions[shipment.status as keyof typeof statusOptions]}</td>
                            <td>{formatDate(shipment.creation_date)}</td>
                            <td>{formatDate(shipment.formation_date)}</td>
                            <td>{formatDate(shipment.planned_date)}</td>
                            <td>{shipment.completion_date}</td>
                            <td>{shipment.owner}</td>
                            <td>{shipment.storage}</td>
                            <td>{shipment.operation_type ? "Отгрузка" : "Доставка"}</td>
                            <td>{shipment.license_plate_number}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            </div>
        </div> 
        {!shipments.length &&
            <h3 className="text-center mt-5">Отправки не найдены</h3>
         }
      <Footer />
    </div>
  );
};

export default ShipmentsPage;