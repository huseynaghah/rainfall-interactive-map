import './App.scss';
import './index.css'
import 'leaflet/dist/leaflet.css';
import {MapContainer} from "react-leaflet";
import 'esri-leaflet-renderers';
import '../src/plugins/side-by-side.js'
import SelectLeftYearComponent from "./components/select-left-year.component.tsx";
import SelectRightYearComponent from "./components/select-right-year.component.tsx";
import SelectDistrictComponent from "./components/select-district.component.tsx";
import LayersComponent from "./components/map-layers.component.tsx";
import {centerPos} from "./plugins/variables.ts";
import {useStore} from "./store/store.config.ts";
import ShowLeftChangeComponent from "./components/show-left-change.component.tsx";
import ShowRightChangeComponent from "./components/show-right-change.component.tsx";
import {CategoryScale, Chart as ChartJS, LinearScale, Filler, LineElement, PointElement} from "chart.js";
import SelectBasemapComponent from "./components/select-basemap.component.tsx";
import ChartComponent from "./components/chart.component.tsx";
import LegendComponent from "./components/legend.component.tsx";
import PopupsContainerComponent from "./components/popups-container.component.tsx";
import {ToastContainer, Zoom} from "react-toastify";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler)

function App() {

    const mapKey = useStore('mapKey') as string;

    return (
        <>
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-lg-2 mt-20'}>
                        <div className={'side-panel'}>
                            <SelectDistrictComponent/>
                            <SelectLeftYearComponent/>
                            <ShowLeftChangeComponent/>
                        </div>
                    </div>
                    <div className={'col-lg-8 mt-20'}>
                        <MapContainer key={mapKey} style={{height: '70vh'}} zoom={7} center={centerPos}>
                            <LayersComponent/>
                        </MapContainer>
                    </div>
                    <div className={'col-lg-2 mt-20'}>
                        <div className={'side-panel'}>
                            <SelectBasemapComponent/>
                            <SelectRightYearComponent/>
                            <ShowRightChangeComponent/>
                        </div>
                    </div>
                    <div className={'col-lg-12'}>
                        <ChartComponent/>
                    </div>
                    <LegendComponent/>
                    <PopupsContainerComponent/>
                </div>

            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={1200}
                closeOnClick={true}
                transition={Zoom}
            />
        </>
    )
}

export default App;
