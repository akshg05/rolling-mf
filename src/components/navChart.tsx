import { Line } from "react-chartjs-2";
import { NavDatum } from "../models/SchemeDataResponse";

export default function NavChart(props: { navData: NavDatum[] }) {

    const data = {
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

    const options = {
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


    return (
        <Line data={data} options={options} />
    )
}