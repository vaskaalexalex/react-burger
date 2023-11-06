import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "./action-types";
import type { TWSStoreActions } from "./types";

const wsUrl: string = "wss://norma.nomoreparties.space/chat";

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions))
  )
);
