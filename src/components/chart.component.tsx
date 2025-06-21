import {Line} from "react-chartjs-2";
import {Card} from "antd";
import {useStore} from "../store/store.config.ts";

const ChartComponent = () =>{

    const labels = useStore('chartYears') as string[];
    const dataset = useStore('chartRainfalls') as number[];
    const chartLoader = useStore('chartLoader') as boolean;

    return (
        <Card className={'line-chart mt-20'} loading={chartLoader}>
            <Line
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                }}
                data={{
                    labels,
                    datasets: [{
                        data: dataset,
                        tension: 0.1,
                        fill: true,
                        borderColor: '#68b3f6',
                        backgroundColor: 'rgb(104,179,246, 0.2)',
                    }]
                }}/>

        </Card>
    )
}

export default ChartComponent;