import "./PartPage.css";
import { FC, useEffect } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPartById } from "../../store/slices/partsSlice";
import { Col, Row, Spinner } from "react-bootstrap";
import Footer from "../../components/footer/footer";
import { RootState } from "../../store/store";

const defaultImage = "/images/DefaultImage.webp";

export const PartPage: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pageData = useSelector((state: RootState) => state.parts.selectedPart);

  useEffect(() => {
    if (id) {
      dispatch(getPartById(id) as any);
    }
  }, [id, dispatch]);
  
  

  return (
    <div className="custom-container">
      {pageData ? (
      <div className="in-part-page"> 
        <BreadCrumbs
          crumbs={[
            { label: ROUTE_LABELS.PARTS, path: ROUTES.PARTS },
            { label: pageData?.part_name || "Деталь" },
          ]}
        />
        <Row>
          <Col xs={12}>
            <h2 className="in-part-name">
              {pageData.part_name} - {pageData.specification}
            </h2>
            <div className="in-part-oem">OEM: {pageData.oem_number}</div>
            <hr />
            <p className="in-part-description">{pageData.short_description}</p>
            <Row className="in-part-content g-2">
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
                  {pageData.set_composition ? (
                    <>
                      <h4>Состав комплекта:</h4>
                      <ul className="list-unstyled">
                        {pageData.set_composition
                            .split('\n')
                            .filter(item => item.trim() !== '')
                            .map((part, index) => {
                              console.log('item:', part);
                              return <li key={index}>{part}</li>
                            })}
                      </ul>
                    </>
                  ) : null}
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