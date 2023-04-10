import React, { useState } from "react";
import "./App.css";
import AppHeader from "../header/app-header";
import BurgerConstructor from "../constructor/burger-constructor";
import BurgerIngredients from "../ingredients/burger-ingredients";
import { IIngredient } from "../constants";

function App() {
  const [selected, setSelected] = useState<IIngredient[]>([]);
  return (
    <div className="App">
      <AppHeader />
      <div className="body">
        <BurgerIngredients selected={selected} setSelected={setSelected} />
        <BurgerConstructor selected={selected} />
      </div>
    </div>
  );
}

export default App;
