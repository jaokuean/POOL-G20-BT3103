import { Bar } from 'vue-chartjs'
import database from "../../firebase";

var labelArray = [];
var dataArray = [];
var bgColors = [];

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
        factor = 0.5;
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}
function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / (steps - 1),
        interpolatedColorArray = [];

    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for (var i = 0; i < steps; i++) {
        const rbg = interpolateColor(color1, color2, stepFactor * i);
        interpolatedColorArray.push(rgbToHex(rbg[0], rbg[1], rbg[2]));
    }

    return interpolatedColorArray;
}

const serviceRef = database.firestore().collection("services").orderBy("score", "desc");
serviceRef.get().then((querySnapShot) => {
    const counter = querySnapShot.size;
    bgColors = interpolateColors("rgb(35, 255, 0)", "rgb(255, 0, 0)", counter)
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
                    backgroundColor: bgColors,

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
                    }, gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }

                }], yAxes: [{
                    ticks: {
                        fontColor: 'white',
                        min: 0
                    }, gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }

                }],
            },
            responsive: true,

            maintainAspectRatio: false,
        }
    }), methods: {

    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
}