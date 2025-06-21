import {Card} from "antd";
import {useEffect, useState} from "react";
import {useStore} from "../store/store.config.ts";

const ShowRightChangeComponent = () => {

    const rightMinMax: number[] = useStore('rightMinMax') as number[];
    const rightLaoder: boolean = useStore('rightLoader') as boolean;
    const currentDistrict = useStore('currentDistrict') as string;

    const [min, setMin] = useState<number | null>(null);
    const [max, setMax] = useState<number | null>(null);


    useEffect(() => {

        if (!rightMinMax || rightMinMax.length === 0) return;

        const minusArray = rightMinMax.filter((value) => value < 0);
        const plusArray = rightMinMax.filter((value) => value > 0);

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


    }, [rightMinMax]);

    return (<>
        <Card className={'card'} loading={rightLaoder}>
            <p className={'text-center change-text'}>{currentDistrict === 'all' ? 'All districts' : currentDistrict}</p>
            <p className={'text-center change-text-increase'}>
                Max Increase: <span> {max?.toFixed(2) || 'Increase not detected...'} </span>
            </p>
            <p className={'text-center change-text-decrease'}>
                Max Decrease: <span>{min?.toFixed(2) || 'Decrease not detected...'}</span>
            </p>
        </Card>
    </>)
};

export default ShowRightChangeComponent;