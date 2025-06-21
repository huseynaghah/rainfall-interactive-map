import {Card} from "antd";
import {useEffect, useState} from "react";
import {useStore} from "../store/store.config.ts";

const ShowLeftChangeComponent = () => {

    const leftMinMax: number[] = useStore('leftMinMax') as number[];
    const leftLoader = useStore('leftLoader') as boolean;

    const [min, setMin] = useState<number | null>(null);
    const [max, setMax] = useState<number | null>(null);


    useEffect(() => {

        if (!leftMinMax || leftMinMax.length === 0) return;

        const minusArray = leftMinMax.filter((value) => value < 0);
        const plusArray = leftMinMax.filter((value) => value > 0);

        if (minusArray.length > 0) {
            setMin(Math.min(...minusArray))
        } else {
            setMin(null);
        }

        if (plusArray.length > 0) {
            setMax(Math.max(...plusArray))
        } else {
            setMax(null);
        }


    }, [leftMinMax]);

    return (<>
        <Card className={'card'} loading={leftLoader}>
            <p className={'text-center change-text-increase'}>
                Maksimal Artım: <span> {max?.toFixed(2) || 'Artım aşkarlanmadı...'} </span>
            </p>
            <p className={'text-center change-text-decrease'}>
                Maksimal Azalma: <span>{min?.toFixed(2) || 'Azalma aşkarlanmadı...'}</span>
            </p>
        </Card>
    </>)
};

export default ShowLeftChangeComponent;