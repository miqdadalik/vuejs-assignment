<template>
    <div class="search-result-wrapper">
        <div class="form-group" id="search-results" v-if="loaded">
            <div class="row justify-content-center">
                <label><b>Choose Your Vehicle</b></label>
            </div>
        </div>
        <div class="row justify-content-center text-center">
            <article class="col-12 col-md-3" v-for="car in getCars()">
                <div class="card">
                    <img v-bind:src="car.photo" />
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-12">
                                <b>{{car.name}}</b>
                                <div><small>{{car.carType}}</small></div>
                            </div>
                        </div
                    ></div>
                    <div class="card-footer"><div class="row"><div class="col-6 text-left">
                                {{car.location}}
                            </div> <div class="col-6 text-right">
                                Rs. {{car.price}}/Day
                    </div></div></div>
                    <div class="card-footer"><div class="row"><div class="col-6 text-left">
                                {{car.fuelType}}
                            </div> <div class="col-6 text-right">
                                {{car.transmission}}
                    </div></div></div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-12 text-center">
                                <div class="badge badge-danger badge-not-available" v-if="car.soldout">NOT AVAILABLE</div>
                                <div class="badge badge-success badge-not-available" v-if="car.booked">BOOKED</div>
                                <button type="button" class="btn btn-primary btn-block"
                                    v-if="!car.soldout && !car.booked"
                                    v-on:click="rent(car)">Rent This Car</button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>

    export default {
        props: [
            'carsData',
            'location',
            'startDate',
            'endDate',
            'bus'
        ],
        data() {
            return {
                loaded: false,
                cars: this.carsData,
            }
        },
        watch: { 
            carsData: function(newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            }
        },
        methods: {
            getCars: function() {
                let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                let startOn = days[new Date(this.startDate).getDay()];
                let endOn = days[new Date(this.endDate).getDay()]
                return this.cars.filter((car) => {
                    if (car && car.location && car.location === this.location) {
                        if (car.availability.indexOf(startOn) == -1) {
                            car.soldout = true;
                        }
                        this.loaded = true;
                        return true;
                    }
                });
            },
            rent: function(car) {
                console.log(car);
                this.$parent.rent(car);
            },
            testing: function() {
                console.log('ok');
                var tempCars = this.cars;
                this.cars = [];
                this.cars = tempCars;
            }
        },
        mounted() {
            this.bus.$on('testing', this.testing)
        }
    }
</script>
