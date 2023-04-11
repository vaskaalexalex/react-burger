import React from "react";
import { ReactComponent as AcceptBg } from "../../../images/accpet-bg.svg";
import totalStyles from "./orded-details.module.css";

const OrderDetails = () => {
  return (
    <div className={totalStyles.total}>
      <div className={`${totalStyles.number} text text_type_digits-large`}>
        {Math.floor(Math.random() * 1000000)}
      </div>
      <div className="text text_type_main-default" style={{ fontSize: "24px" }}>
        идентификатор заказа
      </div>
      <div className="mt-15 mb-15">
        <AcceptBg />
      </div>
      <div
        style={{ fontSize: "16px" }}
        className="text text_type_main-default mb-2"
      >
        Ваш заказ начали готовить
      </div>
      <div
        style={{ fontSize: "16px", marginBottom: "120px" }}
        className="text  text_type_main-default text_color_inactive"
      >
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};

export default OrderDetails;
