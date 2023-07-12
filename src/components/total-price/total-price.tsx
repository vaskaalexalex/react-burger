import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cartStyles from "./total-price.module.css";

interface TotalPriceType {
  price: number;
  size?: "default" | "medium" | "large";
}

export function TotalPrice({ price, size }: TotalPriceType) {
  return (
    <div className={cartStyles["cart_total"]}>
      <p
        className={`${cartStyles["cart-price"]} text text_type_digits-${
          size ? size : "default"
        }`}
      >
        {price}
      </p>
      <div
        className={`${
          cartStyles[`cart_price_${size ? size : "default"}`]
        } ml-2`}
      >
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}
