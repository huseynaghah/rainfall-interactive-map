import {Card, Select} from "antd";
import {yearsArray} from "../plugins/variables.ts";
import {useCallback} from "react";
import {store} from "../store/store.config.ts";
import {setLeftYear} from "../store/store.reducer.ts";

const SelectLeftYearComponent = () => {

    const yearsOptions = yearsArray.map(year => ({value: year, label: year}));

    const handleYearChange = useCallback((value: string) => {
        store.dispatch(setLeftYear(value));
    }, []);


    return (
        <Card className={'card'}>
            <p className={'select-text'}>
                Select year:
            </p>
            <Select options={yearsOptions}
                    onChange={handleYearChange}
                    className={'select-dropdown'}
                    defaultValue={yearsOptions[0].value}/>
        </Card>
    );
};

export default SelectLeftYearComponent;