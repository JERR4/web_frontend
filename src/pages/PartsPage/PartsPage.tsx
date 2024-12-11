import "./PartsPage.css";
import { FC, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import InputField from "../../components/InputField/InputField";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { T_Part} from "../../modules/types.ts";
import { PartCard } from "../../components/PartCard/PartCard";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { useAppDispatch, RootState , useAppSelector} from "../../store/store.ts";
import { getPartsByName, setTitle } from "../../store/slices/partsSlice";
import { PARTS_MOCK } from "../../modules/mock";
import { dest_root } from "../../../target_config.ts";

const PartsPage: FC = () => {
  const dispatch = useAppDispatch();
  const [partName, setPartName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState<T_Part[]>([]);
  const {draft_shipment_id, parts_amount} = useAppSelector((state) => state.shipments)
  const hasDraft = draft_shipment_id != null
  const isAuthenticated = useAppSelector((state) => state.user.is_authenticated);
  const selectedTitle = useAppSelector((state: RootState) => state.parts.part_name);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTitle) {
      setPartName(selectedTitle);
      handleSearch(selectedTitle);
    } else {
      handleSearch('');
    }
  }, [selectedTitle]);

  const handleSearch = (searchTerm: string) => {
    setLoading(true);
    dispatch(setTitle(searchTerm));

    dispatch(getPartsByName({}) as any)
      .unwrap()
      .then((response: T_Part[]) => {
        setParts(response);
        setLoading(false);
      })
      .catch(() => {
        setParts(
          PARTS_MOCK.parts.filter((item: T_Part) =>
            item.part_name
              .toLocaleLowerCase()
              .startsWith(searchTerm.toLocaleLowerCase())
          )
        );
        setLoading(false);
      });
      
  };

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.PARTS}/${id}/`);
  };

  const handleSubmit = () => {
    handleSearch(partName);
  };

  return (
    <div className="custom-container">
      <div className="parts-data">
      {isAuthenticated ? (
        <>
        <Row className="align-items-center">
            <Col md={4}>
              <div className="crumbs">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PARTS }]} />
              </div>
            </Col>
            <Col md={4} className="header-truck">
                <h2>Комплектующие</h2>
                <div className="truck">
                <div
                  className={`truck-bg ${!hasDraft ? 'disabled' : ''}`}
                  onClick={() => hasDraft && navigate(`${ROUTES.SHIPMENTS}/${draft_shipment_id}/`)}
                >
                  <img src={`${dest_root}/images/truck.png`} alt="Грузовик" className="truck-icon" />
                </div>
                <span 
                  className="truck-pill position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                  style={{ backgroundColor: "#3f8dfb" }}
                >
                  {parts_amount}
                </span>
              </div>
            </Col>
            <Col md={4} className="shipment button d-flex justify-content-end">
              <div className="orders-button">
              <button
                disabled={!hasDraft}
                type="button"
                className="btn btn-outline-dark"
                onClick={() => navigate(`${ROUTES.SHIPMENTS}/${draft_shipment_id}/`)}
              >
                В обработке
              </button>
                <span 
                  className="pill position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                  style={{ backgroundColor: "#3f8dfb" }}
                >
                  {parts_amount}
                </span>
              </div>
            </Col>
          </Row>
          </>
        ) : (
          <>
          <div className="head">
              <div className="crumbs">
                  <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PARTS }]} />
              </div>
              <div className="line">
                  <hr></hr>
              </div>
              <h2 className="title">Комплектующие</h2>
          </div>
          </>
        )}
        <div className="data">
          <div className="name-input">
            <InputField
              value={partName}
              placeholder="Введите название"
              setValue={setPartName} 
              loading={loading}
              onSubmit={handleSubmit}
            />
          </div>
          {loading && (
            <div className="loadingBg">
              <Spinner animation="border" />
            </div>
          )}

          {!loading && (
            !parts.length ? (
              <div>
                <h1>К сожалению, пока ничего не найдено</h1>
              </div>
            ) : (
              <div className="cards">
                <Row className="g-2 p-0">
                  {parts.map((item) => (
                    <Col key={item.id} lg={12} xl={6}>
                    <PartCard
                      part={item}
                      imageClickHandler={() => handleCardClick(item.id)}
                      onAddToDraft={handleSubmit}
                    />
                    </Col>
                  ))}
                </Row>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartsPage;