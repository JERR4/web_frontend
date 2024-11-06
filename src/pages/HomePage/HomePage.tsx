import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { Button } from "react-bootstrap";
import "./HomePage.css"; 

export const HomePage: FC = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="home">
      <video className="background-video" autoPlay loop muted>
        <source src="video/background.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <div className="overlay" />
      <div className="content">
        <h1>Склад комплектующих</h1>
        <p>
          Сервис помогает сотрудникам склада добавлять и отслеживать отправки, а
          руководителям — контролировать процессы отгрузки и доступность товаров.
          Упростите складские операции и повысите эффективность работы с
          комплектующими
        </p>
        <Link to={ROUTES.PARTS}>
          <Button variant="light" className="btn-transparent">Просмотр комплектующих</Button>
        </Link>
      </div>
      <footer className="home-page-custom-footer">
        2024 Склад комплектующих. Все права защищены.
      </footer>
    </div>
  );
};