import { FC, useEffect, useState } from "react";
import "./ShipmentPage.css";
import { ShipmentCard } from "../../components/ShipmentCard/ShipmentCard.tsx";
import Footer from "../../components/footer/footer.tsx";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import {E_ShipmentStatus} from "../../modules/types.ts";
import {useParams, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {
    deleteDraftShipment,
    fetchShipment,
    removeShipment,
    sendDraftShipment,
    triggerUpdateMM,
    updateShipment
} from "../../store/slices/shipmentsSlice.ts";

export interface Part {
    id: number;
    quantity: number;
    image: string;
    part_name: string;
    specification: string;
    oem_number: string;
}

const ShipmentPage: FC = () => {
    const navigate = useNavigate()
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated)

    const shipment = useAppSelector((state) => state.shipments.shipment)
    
    const [storage, setStorage] = useState<string>(shipment?.storage || '');
    const [operation_type, setOperationType] = useState<boolean>(shipment?.operation_type || true);
    const [planned_date, setPlannedDate] = useState<string>(shipment?.planned_date || '');
    const [plate_number, setPlateNumber] = useState<string >(shipment?.license_plate_number? String(shipment.license_plate_number) : ''); 

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(ROUTES.PAGE403)
        }
        }, [isAuthenticated]);

    useEffect(() => {
        dispatch(fetchShipment(id || ''))
        return () => {
            dispatch(removeShipment());
        };
    }, []);

    useEffect(() => {
        setStorage(shipment?.storage || '')
        setOperationType(shipment?.operation_type || true)
        setPlannedDate(shipment?.planned_date || '')
        setPlateNumber(shipment?.license_plate_number ? String(shipment.license_plate_number) : '')
    }, [shipment]);

    const sendShipment = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!storage || !planned_date) {
            alert("Пожалуйста, заполните все обязательные поля.");
            return;
        }
    
        await saveShipment();
    
        await dispatch(sendDraftShipment());
    
        navigate(ROUTES.SHIPMENTS);
    };
    

    const saveShipment = async (e?: React.FormEvent) => {
        e?.preventDefault()

        const data = {
            storage,
            operation_type,
            planned_date
        }

        await dispatch(updateShipment(data))
        await dispatch(triggerUpdateMM())
    }

    const deleteShipment = async () => {
        await dispatch(deleteDraftShipment())
        navigate(ROUTES.PARTS)
    }

    if (!shipment) {
        return (
        <div className="container">
            <h3 className="text-center">Загрузка...</h3>
        </div>
        );
    }

    const isDraft = shipment.status == E_ShipmentStatus.Draft
    const isCompleted = shipment.status == E_ShipmentStatus.Completed

    return (
        <div className="shipment-container">
            <div className="shipment-data">
                    <div className="head">
                        <div className="crumbs">
                            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.SHIPMENTS }]} />
                        </div>
                        <div className="line">
                            <hr></hr>
                        </div>
                        <h2 className="title">В обработке</h2>
                </div>
                <div className="row">
                    <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <form className="shipment-form">
                            <div className="shipment-form-group">
                            <label className="no-wrap">Склад:</label>
                                <input
                                type="text"
                                value={storage}
                                placeholder="Введите название..."
                                onChange={(e) => setStorage(e.target.value)}
                                name="storage"
                                disabled={!isDraft}
                                />
                            </div>

                            <div className="shipment-form-group">
                                <label className="no-wrap">Плановая дата:</label>
                                <input
                                type="date"
                                id="planned_date"
                                value={planned_date}
                                onChange={(e) => setPlannedDate(e.target.value)}
                                name="planned_date"
                                disabled={!isDraft}
                                />
                            </div>

                            <div className="shipment-form-group">
                                <label>Тип операции:</label>
                                <input
                                    type="radio"
                                    id="delivery"
                                    name="operation_type"
                                    value="delivery"
                                    checked={operation_type === true}
                                    onChange={() => setOperationType(true)}
                                    disabled={!isDraft}
                                />
                                <label htmlFor="delivery">Доставка</label>

                                <input
                                    type="radio"
                                    id="dispatch"
                                    name="operation_type"
                                    value="dispatch"
                                    checked={operation_type === false}
                                    onChange={() => setOperationType(false)}
                                    disabled={!isDraft}
                                />
                                <label htmlFor="dispatch">Отгрузка</label>
                            </div>

                            {isCompleted && plate_number && (
                                <>

                            <div className="shipment-form-group">
                                    <label className="no-wrap">Номер авто</label>
                                    <input 
                                        type="text"
                                        value={plate_number} 
                                        disabled={true} 
                                        readOnly 
                                    />
                            </div>
                                </>
                            )}

                            {isDraft &&
                                <button className="btn btn-dark" onClick={saveShipment}>
                                    Сохранить
                                </button>
                            }
                        </form>
                    </div>

                    <div className="delivery-cards">
                        <div className="row g-2">
                        {shipment.parts.map((part) => (
                            <div className="col-12" key={part.id}>
                            <ShipmentCard part={part} showRemoveBtn={isDraft} editMM={isDraft}/>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>

            </div>
            <div className="bottom">
                {isDraft &&
                    <div className="row shipment-buttons">
                        <div className="col text-start">
                        <button className="btn btn-danger delete-draft-part-btn" onClick={deleteShipment}>
                            Удалить
                        </button>
                        </div>

                        <div className="col text-end hide-buttons">
                        <button className="btn btn-outline-dark" onClick={sendShipment}>
                            Отправить
                        </button>
                        </div>
                    </div>
                }
                <Footer/>
            </div>
        </div>
    );
};

export default ShipmentPage;
