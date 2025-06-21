import { createRoot } from 'react-dom/client'
import 'light-grid/index.scss'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.config.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
,
)
