import {useCallback, useEffect, useState} from "react";
import {layersUrl} from "../plugins/variables.ts";
import {Drawer} from "antd";
import {store, useStore} from "../store/store.config.ts";
import {setIsDrawerOpen} from "../store/store.reducer.ts";

const LegendComponent = () => {

    const [items, setItems] = useState<{ color: string; label: string }[]>([]);
    const [layerName, setLayerName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isOpen = useStore('isDrawerOpen') as boolean;
    const handleClose = useCallback(() => {store.dispatch(setIsDrawerOpen(false))}, []);

    useEffect(() => {
        const fetchLegend = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${layersUrl}/0?f=json`);
                const data = await response.json();
                console.log(data);
                setLayerName(data.name);
                const renderer = data.drawingInfo.renderer;
                const result: { color: string; label: string }[] = [];

                if (renderer.type === "classBreaks") {
                    renderer.classBreakInfos.forEach((info: any) => {
                        result.push({
                            color: toRgba(info.symbol.color),
                            label: info.label || `${info.classMinValue} - ${info.classMaxValue}`,
                        });
                    });
                } else if (renderer.type === "uniqueValue") {
                    renderer.uniqueValueInfos.forEach((info: any) => {
                        result.push({
                            color: toRgba(info.symbol.color),
                            label: info.label || info.value,
                        });
                    });
                } else if (renderer.type === "simple") {
                    result.push({
                        color: toRgba(renderer.symbol.color),
                        label: renderer.label || data.name || "Layer",
                    });
                }

                setItems(result);

            } catch (error) {
                console.error("Error while get Legenda", error);
            }
        };

        fetchLegend().finally(() => setIsLoading(false));
    }, []);

    const toRgba = (arr: number[]) => {
        const [r, g, b, a = 255] = arr;
        return `rgba(${r},${g},${b},${a / 255})`;
    };

    return (
        <Drawer
            closable
            destroyOnHidden
            title={<b>{ layerName } Legend Table</b>}
            placement="left"
            open={isOpen}
            loading={isLoading}
            onClose={handleClose}
        >

            {items.map((item, index) => (
                <div key={index} className="legenda-item">
                    <span style={{backgroundColor: item.color }} className={'legenda-colorbox'} />
                    <span>{item.label}</span>
                </div>
            ))}
        </Drawer>
    );
};



export default LegendComponent;
