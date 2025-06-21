import {Card, Checkbox, CheckboxChangeEvent, Select} from "antd";
import {useCallback} from "react";
import {store, useStore} from "../store/store.config.ts";
import {setCurrentDistrict, setShowBorders} from "../store/store.reducer.ts";

const SelectDistrictComponent = () => {

    const districts = useStore('districts') as string[];
    const showBorders = useStore('showBorders') as boolean;


    const districtsOptions =
        districts.length > 2 ?
            districts?.map(district => (
                {
                    value: district,
                    label: district
                })
            ).sort((a, b) => a.value.localeCompare(b.value))
            :
            []
    ;

    const handleDistrictChange = useCallback((value: string) => {
        store.dispatch(setCurrentDistrict(value || 'all' ));
    }, []);

    const handleCheckboxChange = useCallback((e: CheckboxChangeEvent) => {
        store.dispatch(setShowBorders(e.target.checked));
        console.log(e.target.checked);
    }, []);



    return (
        <Card className={'card'}>
            <p className={'select-text'}>
                Select District:
            </p>
            <Select options={districtsOptions}
                    placeholder={'All districts'}
                    allowClear={true}
                    showSearch={true}
                    onChange={handleDistrictChange}
                    className={'select-dropdown'}/>
            <Checkbox onChange={handleCheckboxChange} checked={showBorders}>
                <p className={'select-text-small'}>Show district borders</p>
            </Checkbox>
        </Card>
    );
};

export default SelectDistrictComponent;