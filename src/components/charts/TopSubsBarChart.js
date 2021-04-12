import { Bar } from 'vue-chartjs'
import database from "../../firebase";

var labelArray = [];
var dataArray = [];

const serviceRef = database.firestore().collection("services").orderBy("score", "desc");
serviceRef.get().then((querySnapShot) => {
    querySnapShot.forEach(async (doc) => {
        //var service = doc.data();
        labelArray.push(doc.data().serviceName);
        dataArray.push(doc.data().score);
    });
});

export default {
    extends: Bar,
    data: () => ({
        chartdata: {
            labels: labelArray,
            datasets: [
                {
                    label: 'Score',
                    data: dataArray,
                    backgroundColor: '#fff',
                    borderWidth: 1.0,
                    borderColor: "#000"
                }
                ,
            ]
        },

        options: {
            indexAxis: 'y',

            legend: {
                display: false,
            },
            layout: {
                padding: {
                    left: 5,
                    right: 0,
                    top: 0,
                    bottom: 5
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: 'white',
                        min: 0
                    }

                }], yAxes: [{
                    ticks: {
                        fontColor: 'white',
                        min: 0
                    }

                }],
            }, maintainAspectRatio: false
        }
    }),
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
}