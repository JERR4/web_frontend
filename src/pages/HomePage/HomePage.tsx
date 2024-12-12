import { FC, useEffect } from "react";
import { dest_root } from "../../../target_config";
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
        <source src={`${dest_root}/video/background.mp4`} type="video/mp4" />
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
      </div>
      <footer className="home-page-custom-footer">
        <span className="footer-text full-text">
          2024 Склад комплектующих. Все права защищены.
        </span>
        <span className="footer-text break-text">
          2024 Склад комплектующих.<br />Все права защищены.
        </span>
      </footer>
    </div>
  );
};