import {Card, Select} from "antd";
import {basemaps} from "../plugins/variables.ts";
import {useCallback} from "react";
import {store} from "../store/store.config.ts";
import {setBasemap} from "../store/store.reducer.ts";

const SelectBasemapComponent = () => {

    const basemapOptions = basemaps.map(basemap => ({value: basemap, label: basemap.replace('arcgis/', '')}));

    const handleBasemapChange = useCallback((value: string) => {
        store.dispatch(setBasemap(value));
    }, []);

    return (
        <Card className={'card'}>
            <p className={'select-text'}>
                Select basemap:
            </p>
            <Select
                options={basemapOptions}
                onChange={handleBasemapChange}
                className={'select-dropdown'}
                defaultValue={basemapOptions[0].value}/>
        </Card>
    );
};

export default SelectBasemapComponent;