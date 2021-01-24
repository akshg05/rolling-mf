import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { NavDatum } from "../models/SchemeDataResponse";

type ChartPeriod = "1W"|'1M'|"1Y"|"3Y"|"All"

function TimePeriodIndicator(props:{updatePeriod:any, chartPeriod:ChartPeriod, currentPeriod:ChartPeriod}){

    return(
        <div onClick={()=>props.updatePeriod(props.chartPeriod)}
        style={{margin:'5px', fontWeight: props.chartPeriod == props.currentPeriod? 'bold':'normal'}}>
            {props.chartPeriod}
        </div>
    )

}

export default function NavChart(props: { navData: NavDatum[] }) {
    
    const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("All")
    let data = useRef(
        {
            labels: props.navData.slice(0).reverse().map((item) => item.date),
            datasets: [
                {
                    data: props.navData.slice(0).reverse().map((item) => item.nav),
                    borderWidth:1,
                    borderColor:'red',
                    pointBorderWidth:0,
                    pointRadius: 0,
                    
                }
            ],
          
        }
    )

    let options = {
        scales: {
            xAxes: [{
                ticks: {
                    display: true,
                    maxTicksLimit: 10,
                    callback:  ()=>''
                }
            }]
        }

    }

    function changeTimePeriod(tickCount:number){
        data.current.labels = props.navData.slice(0).reverse().slice(tickCount).map((item) => item.date)
        data.current.datasets[0].data = props.navData.slice(0).reverse().slice(tickCount).map((item) => item.nav)

    }

    function updatePeriod(timePeriod: ChartPeriod){
        switch(timePeriod){
            case "1W": changeTimePeriod(props.navData.length - 7)
            break;

            case "1M": changeTimePeriod(props.navData.length - 30)
            break;

            case "1Y": changeTimePeriod(props.navData.length - 365)
            break;

            case "3Y": changeTimePeriod(props.navData.length - 365*3)
            break;

            case "All": changeTimePeriod(0)
            break;

        }

        setChartPeriod(timePeriod)
    }


    return (
        <div className="flex-column" style={{alignItems:'center', zIndex:1}}>
            <Line data={data.current} options={options}/>
            <div className='flex-row'>
                <TimePeriodIndicator chartPeriod='1W' updatePeriod={updatePeriod} currentPeriod={chartPeriod}/>
                <TimePeriodIndicator chartPeriod='1M' updatePeriod={updatePeriod} currentPeriod={chartPeriod}/>
                <TimePeriodIndicator chartPeriod='1Y' updatePeriod={updatePeriod} currentPeriod={chartPeriod}/>
                <TimePeriodIndicator chartPeriod='3Y' updatePeriod={updatePeriod} currentPeriod={chartPeriod}/>
                <TimePeriodIndicator chartPeriod='All' updatePeriod={updatePeriod} currentPeriod={chartPeriod}/>
            </div>
        </div>
    )
}