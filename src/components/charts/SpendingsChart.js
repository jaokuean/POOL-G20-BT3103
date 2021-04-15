import { Doughnut } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Doughnut,
    data: function () {
        return {
            datacollection: {
                labels: ['Video Streaming', 'News', 'Food', "Music", 'VPN', 'Reading'],
                datasets: [{
                    label: "Amount spent ($)",
                    backgroundColor: ['red','green','yellow','purple','brown','blue'],
                    data: [0,0,0,0,0,0]
                }]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'Breakdown of spendings ($)'
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        }
    },
    methods: {
        fetchItems: function () {
            const uid = this.$store.getters.user.data.uid;
            const poolgroups_ref = database.firestore().collection('poolgroups');
            const pools_ref = database.firestore().collection('pools');
            const services_ref = database.firestore().collection('services');
            poolgroups_ref.where('userID','==', uid).get().then(querySnapShot => {
                const size = querySnapShot.size;
                let count = 0;
                if (size == 0) {
                    this.options.title.text = 'You have no subscriptions';
                    this.options.legend.display = false;
                    this.render();
                }
                querySnapShot.docs.forEach(doc => {
                    pools_ref.doc(doc.data().poolID).get().then(doc=>{
                        if (doc.exists) {
                            const pool = doc.data();
                            services_ref.doc(pool.serviceId).get().then(doc => {
                                if (doc.exists) {
                                    let index = this.datacollection.labels.indexOf(doc.data().category);
                                    let amount = doc.data().fee / (pool.maxSize - pool.remaining);
                                    this.datacollection.datasets[0].data[index] = this.datacollection.datasets[0].data[index] + amount;
                                }
                                // For callback
                                count = count + 1
                                if (count == size) {
                                    this.render();
                                }
                            })
                        }
                    })
                })
            })
        },
        render: function() {
            let i = 0;
            for (i = 0; i < 6; i++) {
                this.datacollection.datasets[0].data[i] = this.datacollection.datasets[0].data[i].toFixed(2);
            }
            this.renderChart(this.datacollection, this.options);
        }
    },
    created () {
        this.fetchItems();
    }
}