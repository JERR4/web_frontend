import "./PartPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { Part, getPartById } from "../../modules/partsStorageApi";
import { Col, Row, Spinner} from "react-bootstrap";
const defaultImage = "/images/DefaultImage.webp";
import  {PARTS_MOCK}  from "../../modules/mock";
import Footer from '../../components/footer/footer';

export const PartPage: FC = () => {
  const [pageData, setPageDdata] = useState<Part>();

  const { id } = useParams(); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;
    getPartById(id)
      .then((response) => setPageDdata(response))
      .catch(
        () =>
          setPageDdata(
            PARTS_MOCK.parts.find(
              (part) => String(part.id) == id
            )
          ) /* В случае ошибки используем мок данные, фильтруем по ид */
      );
  }, [id]);

  return (
    <div className="custom-container">
      <div className="breadcrumbs-wrapper">
        <BreadCrumbs
          crumbs={[
            { label: ROUTE_LABELS.PARTS, path: ROUTES.PARTS },
            { label: pageData?.part_name || "Деталь" },
          ]}
        />
      </div>
      {pageData ? ( // проверка на наличие данных, иначе загрузка
      <div className="in-part-page"> 
        <Row>
          <Col xs={12}>
            <h2 className="in-part-name">
              {pageData.part_name} - {pageData.specification}
            </h2>
            <div className="in-part-oem">OEM: {pageData.oem_number}</div>
            <hr />
            <p className="in-part-description">{pageData.short_description}</p>
            <Row className="in-part-content">
              <Col md={6}>
                <img
                  className="in-part-image"
                  src={pageData.image || defaultImage}
                  alt="Part Image"
                />
              </Col>
              <Col md={6}>
                <div className="in-part-details-bg">
                  <div className="in-part-details">
                    <h4>Состав комплекта:</h4>
                    <ul className="list-unstyled">
                    {pageData.set_composition
                      .split('\n')
                      .filter(item => item.trim() !== '')
                      .map((part, index) => (
                        <li key={index}>{part}</li>
                      ))}
                  </ul>
                  </div>
                </div>
              </Col>
              <div className="in-part-info">
                <div className="in-part-info-details">
                  <p>
                    <strong>Масса комплекта:</strong> {pageData.weight}
                  </p>
                  <p>
                    <strong>Размер комплекта с упаковкой:</strong> {pageData.dimensions}
                  </p>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
        </div>
      ) : (
        <div className="part_page_loader_block">{/* загрузка */}
          <Spinner animation="border" />
        </div>
      )}
      <Footer />
    </div>
  );
};