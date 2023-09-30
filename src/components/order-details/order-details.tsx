import acceptBg from "../../assets/images/accpet.svg";
import totalStyles from "./orded-details.module.css";
const OrderDetails = () => {
  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div className={totalStyles.total}>
      <div className={`${totalStyles.number} text text_type_digits-large`}>
        {orderNumber}
      </div>
      <div className={`${totalStyles.identifier} text text_type_main-default"`}>
        идентификатор заказа
      </div>
      <div className="mt-15 mb-15">
        <img src={acceptBg} alt="" />
      </div>
      <div
        className={`${totalStyles.status} text text_type_main-default mb-2"`}
      >
        Ваш заказ начали готовить
      </div>
      <div
        className={`${totalStyles.footer} text text_type_main-default text_color_inactive"`}
      >
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};

export default OrderDetails;
