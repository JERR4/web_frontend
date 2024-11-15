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
import { PARTS_MOCK } from "../../modules/mock";

const PartsPage: FC = () => {
  const [partName, setPartName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState<PartResult["parts"]>([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    getPartsByName(partName)
      .then((response) => {
        setParts(response.parts);
        setLoading(false);
      })
      .catch(() => {
        setParts(
          PARTS_MOCK.parts.filter((item) =>
            item.part_name
              .toLocaleLowerCase()
              .startsWith(partName.toLocaleLowerCase())
          )
        );
        setLoading(false);
      });
  };

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.PARTS}/${id}`);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="custom-container">
      <div className="parts-data">
          <Row className="align-items-center">
            <Col md={4}>
              <div className="crumbs">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PARTS }]} />
              </div>
            </Col>
            <Col md={4} className="text-center">
              <h2>Комплектующие</h2>
            </Col>
            <Col md={4} className="d-flex justify-content-end">
              <div className="orders-button">
                <button type="submit" className="btn btn-outline-dark">
                  В обработке
                </button>
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill" 
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
                setValue={(value) => setPartName(value)}
                loading={loading}
                onSubmit={handleSearch}
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
                  <Row className="g-2">
                    {parts.map((item) => (
                      <Col key={item.id} xs={12} md={6}>
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