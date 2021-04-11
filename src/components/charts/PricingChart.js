import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    props: ['category'],
    data: function () {
        return {
            datacollection: {},
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: this.category,
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            video:[],
            music:[],
            food:[],
            news:[],
            vpn:[],
            readings:[],
            all:[],
        }
    },
    methods: {
        fetchItems: function () {
            const services_ref = database.firestore().collection('services');
            services_ref.get().then(querySnapShot => {
                const size = querySnapShot.size;
                let count = 0;
                querySnapShot.forEach(doc => {
                    if (doc.exists) {
                        const service = doc.data();
                        this.all.push({name:service.serviceName,fee:service.fee,category:service.category});
                    }
                    // For callback
                    count = count + 1
                    if (count == size) {
                        this.sort();
                    }
                })
            })
        },
        sort: function() {
            this.all = this.all.sort((a,b)=>a.fee - b.fee);
            this.all.forEach(service => {
                switch(service.category) {
                    case 'Video Streaming':
                        this.video.push(service);
                        break;
                    case 'Music':
                        this.music.push(service);
                        break;
                    case 'Food':
                        this.food.push(service);
                        break;
                    case 'News':
                        this.news.push(service);
                        break;
                    case 'VPN':
                        this.vpn.push(service);
                        break;
                    case 'Reading':
                        this.readings.push(service);
                        break;
                }
            })
            this.addData();
        },
        addData: function() {
            // Adding video streaming services data
            let data1 = {
                labels:[],
                datasets: [{
                    label: "Monthly Price ($)",
                    data: [],
                    backgroundColor: this.interpolateColors("rgb(255, 186, 73)", "rgb(32, 163, 158)", this.video.length),
                }]
            };
            this.video.forEach(service => {
                data1.labels.push(service.name);
                data1.datasets[0].data.push(service.fee);
            })
            this.datacollection['video'] = data1;

            // Adding music streaming services data
            let data2 = {
                labels:[],
                datasets: [{
                    label: "Monthly Price ($)",
                    data: [],
                    backgroundColor: this.interpolateColors("rgb(245, 93, 62)", "rgb(135, 142, 136)", this.music.length),
                }]
            };
            this.music.forEach(service => {
                data2.labels.push(service.name);
                data2.datasets[0].data.push(service.fee);
            })
            this.datacollection['music'] = data2;

            // Adding food services data
            let data3 = {
                labels:[],
                datasets: [{
                    label: "Monthly Price ($)",
                    data: [],
                    backgroundColor: this.interpolateColors("rgb(196, 214, 176)", "rgb(71, 121, 152)", this.food.length),
                }]
            };
            this.food.forEach(service => {
                data3.labels.push(service.name);
                data3.datasets[0].data.push(service.fee);
            })
            this.datacollection['food'] = data3;

            // Adding news services data
            let data4 = {
                labels:[],
                datasets: [{
                    label: "Monthly Price ($)",
                    data: [],
                    backgroundColor: this.interpolateColors("rgb(62, 78, 80)", "rgb(250, 207, 173)", this.news.length),
                }]
            };
            this.news.forEach(service => {
                data4.labels.push(service.name);
                data4.datasets[0].data.push(service.fee);
            })
            this.datacollection['news'] = data4;

            // Adding vpn services data
            let data5 = {
                labels:[],
                datasets: [{
                    label: "Monthly Price ($)",
                    data: [],
                    backgroundColor: this.interpolateColors("rgb(254, 147, 140)", "rgb(175, 27, 63)", this.vpn.length),
                }]
            };
            this.vpn.forEach(service => {
                data5.labels.push(service.name);
                data5.datasets[0].data.push(service.fee);
            })
            this.datacollection['vpn'] = data5;

            // Adding readings services data
            let data6 = {
                labels:[],
                datasets: [{
                    label: "Monthly Price ($)",
                    data: [],
                    backgroundColor: this.interpolateColors("rgb(197, 239, 203)", "rgb(2, 4, 2)", this.readings.length),
                }]
            };
            this.readings.forEach(service => {
                data6.labels.push(service.name);
                data6.datasets[0].data.push(service.fee);
            })
            this.datacollection['readings'] = data6;

            // Adding all services data
            let data7 = {
                labels:[],
                datasets: [{
                    label: "Monthly Price ($)",
                    data: [],
                    backgroundColor: this.interpolateColors("rgb(35, 255, 0)", "rgb(255, 0, 0)", this.all.length),
                }]
            };
            this.all.forEach(service => {
                data7.labels.push(service.name);
                data7.datasets[0].data.push(service.fee);
            })
            this.datacollection['all'] = data7;

            this.renderChart(this.datacollection.all, this.options);
        },
        interpolateColor: function(color1, color2, factor) {
            if (arguments.length < 3) { 
                factor = 0.5; 
            }
            var result = color1.slice();
            for (var i = 0; i < 3; i++) {
                result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
            }
            return result;
        },
        interpolateColors: function(color1, color2, steps) {
            var stepFactor = 1 / (steps - 1),
                interpolatedColorArray = [];
        
            color1 = color1.match(/\d+/g).map(Number);
            color2 = color2.match(/\d+/g).map(Number);
        
            for(var i = 0; i < steps; i++) {
                const rbg = this.interpolateColor(color1, color2, stepFactor * i);
                interpolatedColorArray.push(this.rgbToHex(rbg[0],rbg[1],rbg[2]));
            }
        
            return interpolatedColorArray;
        },
        rgbToHex: function(r, g, b) {
            return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        },
        componentToHex: function(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
    },
    created () {
        this.fetchItems();
    },
    watch: {
        category: function() {
            this.options.title.text = this.category;
            switch(this.category) {
                case 'Video Streaming':
                    this.renderChart(this.datacollection.video, this.options);
                    break;
                case 'Music':
                    this.renderChart(this.datacollection.music, this.options);
                    break;
                case 'Food':
                    this.renderChart(this.datacollection.food, this.options);
                    break;
                case 'News':
                    this.renderChart(this.datacollection.news, this.options);
                    break;
                case 'VPN':
                    this.renderChart(this.datacollection.vpn, this.options);
                    break;
                case 'Reading':
                    this.renderChart(this.datacollection.readings, this.options);
                    break;
                case 'All':
                    this.renderChart(this.datacollection.all, this.options);
                    break;
            }
        }
    }
}