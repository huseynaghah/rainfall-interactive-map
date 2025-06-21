import {Card} from "antd";
import {useEffect, useState} from "react";
import {useStore} from "../store/store.config.ts";

const ShowLeftChangeComponent = () => {

    const leftMinMax: { r: number, n: string }[] = useStore('leftMinMax') as { r: number, n: string }[];
    const leftLoader = useStore('leftLoader') as boolean;
    const [min, setMin] = useState<{r: number, n: string} | null>(null);
    const [max, setMax] = useState<{r: number, n: string} | null>(null);


    useEffect(() => {

        if (!leftMinMax || leftMinMax.length === 0) return;

        const minusArray = leftMinMax
            .filter((obj) => obj.r < 0)
            .sort((a, b) => a.r - b.r);

        const plusArray = leftMinMax
            .filter((obj) => obj.r > 0)
            .sort((a, b) => b.r - a.r);


        if (minusArray.length > 0) {
            setMin(minusArray[0]);
        } else {
            setMin(null);
        }

        if (plusArray.length > 0) {
            setMax(plusArray[0]);
        } else {
            setMax(null);
        }


    }, [leftMinMax]);

    return (<>
        <Card className={'card'} loading={leftLoader}>
            <p className={'text-center change-text-increase'}>
                Max Incrase: <span> {max?.r ? max?.r?.toFixed(2) + ` - ` + max?.n: 'Increase not detected...'} </span>
            </p>
            <p className={'text-center change-text-decrease'}>
                Max Decrease: <span>{min?.r ? min?.r?.toFixed(2) + ` - ` + min?.n: 'Decrease not detected...'}</span>
            </p>
        </Card>
    </>)
};

export default ShowLeftChangeComponent;