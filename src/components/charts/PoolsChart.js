import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
                labels: ['Video Streaming', 'News', 'Food', "Music", 'VPN', 'Reading'],
                datasets: [{
                    label: "Number of subscriptions",
                    backgroundColor: ['red','green','yellow','purple','brown','blue'],
                    data: [0,0,0,0,0,0]
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Breakdown of subsciptions'
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
        }
    },
    methods: {
        fetchItems: function () {
            const pools_ref = database.firestore().collection('pools');
            const services_ref = database.firestore().collection('services');
            pools_ref.get().then(querySnapShot => {
                const size = querySnapShot.size;
                let count = 0;
                if (size == 0) {
                    this.render();
                }
                querySnapShot.docs.forEach(doc => {
                    const pool = doc.data();
                    services_ref.doc(pool.serviceId).get().then(doc=>{
                        if (doc.exists) {
                            let index = this.datacollection.labels.indexOf(doc.data().category);
                            this.datacollection.datasets[0].data[index] = this.datacollection.datasets[0].data[index] + (pool.maxSize - pool.remaining);
                        }

                        // For callback
                        count = count + 1
                        if (count == size) {
                            this.render();
                        }
                    })
                })
            })
        },
        render: function() {
            this.renderChart(this.datacollection, this.options);
        }
    },
    created() {
        this.fetchItems();
    },
}