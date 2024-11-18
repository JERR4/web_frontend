import "./PartsPage.css";
import { FC, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { PartResult, getPartsByName } from "../../modules/partsStorageApi";
import InputField from "../../components/InputField/InputField";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { PartCard } from "../../components/PartCard/PartCard";
import { useNavigate } from "react-router-dom";
import Footer from '../../components/footer/footer';
import { setTitle, clearTitle, useTitle } from '../../slices/partsSlice';
import { PARTS_MOCK } from "../../modules/mock";
import { useDispatch } from "react-redux";

const PartsPage: FC = () => {
  const dispatch = useDispatch();
  const [partName, setPartName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState<PartResult["parts"]>([]);
  const selectedTitle = useTitle();
  
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
    if (searchTerm) {
      dispatch(setTitle(searchTerm));
    } else {
      dispatch(clearTitle());
    }

    getPartsByName(searchTerm)
      .then((response) => {
        setParts(response.parts);
        setLoading(false);
      })
      .catch(() => {
        setParts(
          PARTS_MOCK.parts.filter((item) =>
            item.part_name
              .toLocaleLowerCase()
              .startsWith(searchTerm.toLocaleLowerCase())
          )
        );
        setLoading(false);
      });
  };

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.PARTS}/${id}`);
  };

  const handleSubmit = () => {
    handleSearch(partName);
  };

  return (
    <div className="custom-container">
      <div className="parts-data">
        <Row className="align-items-center">
          <Col md={4}>
            <div className="crumbs">
              <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PARTS }]} />
            </div>
          </Col>
          <Col md={4} className="header-truck">
            <h2>Комплектующие</h2>
            <div className="truck">
              <div className="truck-bg">
                <img src="/web_frontend/images/truck.png" alt="Грузовик" className="truck-icon"/>
              </div>
              <span 
                className="truck-pill position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                style={{ backgroundColor: "#3f8dfb" }}
              >
                3
              </span>
            </div>
          </Col>
          <Col md={4} className="shipment button d-flex justify-content-end">
            <div className="orders-button">
              <button type="submit" className="btn btn-outline-dark">
                В обработке
              </button>
              <span 
                className="pill position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                style={{ backgroundColor: "#3f8dfb" }}
              >
                3
              </span>
            </div>
          </Col>
        </Row>
        <div className="data">
          <div className="input">
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
                        imageClickHandler={() => handleCardClick(item.id)}
                        {...item}
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