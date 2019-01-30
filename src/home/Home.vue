<template>
    <div class="full-widtht">
        <SearchView parentDoSearch="doSearch" />
        <div v-if="showResults">
            <ResultsView v-bind:cars-data="cars"
                v-bind:location="location"
                v-bind:startDate="startDate"
                v-bind:endDate="endDate"
                :bus="bus" />

            <b-modal ref="successModal" hide-footer title="Booked!">
                <div class="d-block">
                    <h6>
                        You've succesffully booked <b>{{selectedCar.name}}</b>
                        from <b>{{formatDate(startDate)}}</b> to <b>{{formatDate(endDate)}}</b>
                    </h6>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import { config } from '../constants';
    import SearchView from './Search'
    import ResultsView from './Results'
    import { setTimeout } from 'timers';

    export default {
        components: {
            SearchView,
            ResultsView
        },
        props: [
            'bus'
        ],
        data () {
            return {
                showResults: false,
                cars: [],
                location: '',
                startDate: new Date(),
                endDate: new Date(),
                selectedCar: {}
            }
        },
        methods: {
            fetchItems() {
                config
                fetch(config.apiBaseUrl + 'products?' + new Date().getTime())
                    .then(stream => stream.json())
                    .then(data => this.cars = data)
                    .catch(error => console.error(error))
            },
            doSearch: function(e, location, startDate, endDate) {
                this.fetchItems();
                this.location = location;
                this.startDate = startDate;
                this.endDate = endDate;
                this.showResults = true;
                setTimeout(() => {
                    this.$scrollTo('#search-results', 500)
                })
            },
            rent: function(selectedCar) {

                this.selectedCar = selectedCar;
                if (!this.$parent.isUserLoggedIn()) {
                    this.$parent.showLogin();
                } else {
                    this.rentCar();
                }
            },
            rentCar: function() {
                console.log('emitted selectedCar', this.selectedCar._id);
                fetch(config.apiBaseUrl + 'products/book/' + this.selectedCar._id, {
                    method: 'put',
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': '*'
                    },
                    body: JSON.stringify({
                        soldout: true
                    })
                })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    if (response.status && response.message) {
                        this.$refs.successModal.show();
                        this.selectedCar.booked = true;
                        this.updateBooked();
                        this.bus.$emit('testing')
                    }
                })
                .catch(error => console.error(error));
            },
            updateBooked() {
                this.showResults = false;
                let index = this.cars.findIndex((obj) => {
                    return obj._id === this.selectedCar._id;
                });
                this.cars[index] = this.selectedCar;

                this.showResults = true;
            },
            formatDate(date) {
                return new Date(date).toDateString()
            }
        },
        mounted() {
            this.fetchItems();
            this.bus.$on('userLoggedIn', this.rentCar)
        }
    }
</script>
