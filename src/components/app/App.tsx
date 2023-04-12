import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "../header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { IIngredient } from "../constants";
import { fetchIngredients } from "../../utils/api";

function App() {
  const [selected, setSelected] = useState<IIngredient[]>([]);
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);

  useEffect(() => {
    fetchIngredients().then((data) => setIngredients(data.data));
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className="body">
        <BurgerIngredients
          ingredients={ingredients}
          selected={selected}
          setSelected={setSelected}
        />
        <BurgerConstructor selected={selected} />
      </div>
    </div>
  );
}

export default App;
