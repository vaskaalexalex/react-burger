import React, { useEffect } from "react";
import "./app.css";
import AppHeader from "../header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchIngredients } from "../../services/reducers/burger-ingredients";

function App() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.burgerIngredients);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIngredients());
    }
  }, [dispatch, status]);

  return (
    <div className="app">
      <AppHeader />
      <div className="body">
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
