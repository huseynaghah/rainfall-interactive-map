import {useCallback} from "react";
import {store} from "../store/store.config.ts";
import {setIsDrawerOpen} from "../store/store.reducer.ts";
import {CameraOutlined} from "@ant-design/icons";
import html2canvas from "html2canvas";

const PopupsContainerComponent = () => {

    const handleLeftPopupClick = useCallback(() => {
        store.dispatch(setIsDrawerOpen(true))
    }, []);

    const handleRightPopupClick = useCallback(() => {
        const mapElement: HTMLElement | null = document.querySelector('.leaflet-container');
        if(mapElement) {
            html2canvas(mapElement)
                .then((canvas)=>{
                    const imageData = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.download = "map_screenshot.png";
                    link.href = imageData;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
        }
    }, [])

    return (
        <>
            <div
                className={'popup-container popup-left'}
                onClick={handleLeftPopupClick}>
                <p>Open Legend</p>
            </div>
            <div
                className={'popup-container popup-right'}
                onClick={handleRightPopupClick}>
                <CameraOutlined /><p>Take Screenshot</p>
            </div>
        </>
    )
        ;
};

export default PopupsContainerComponent;