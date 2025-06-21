import {useCallback} from "react";
import {store} from "../store/store.config.ts";
import {setIsDrawerOpen} from "../store/store.reducer.ts";
import {CameraOutlined, PrinterOutlined} from "@ant-design/icons";
// import html2canvas from "html2canvas";

const PopupsContainerComponent = () => {

    const handleLeftPopupClick = useCallback(() => {
        store.dispatch(setIsDrawerOpen(true))
    }, []);

    const handleRightPopupClick = useCallback(() => {
        // const body: HTMLElement | null = document.querySelector('body');
        // if(body) {
        //     html2canvas(body, {useCORS: true})
        //         .then((canvas)=>{
        //             const imageData = canvas.toDataURL('image/jpeg', 0.9);
        //             const link = document.createElement("a");
        //             link.download = "map_screenshot.png";
        //             link.href = imageData;
        //             document.body.appendChild(link);
        //             link.click();
        //             document.body.removeChild(link);
        //         })
        // }
        window.print();
    }, [])

    return (
        <>
            <div
                className={'popup-container popup-left'}
                onClick={handleLeftPopupClick}>
                →
            </div>
            <div
                className={'popup-container popup-right'}
                onClick={handleRightPopupClick}>
                {/*<CameraOutlined />*/}
                <PrinterOutlined />
            </div>
        </>
    )
        ;
};

export default PopupsContainerComponent;