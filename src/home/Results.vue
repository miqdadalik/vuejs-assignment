<template>
    <div class="search-result-wrapper">
        <div class="form-group" id="search-results">
            <div class="row justify-content-md-center">
                <label><b>Choose Your Vehicle</b></label>
            </div>
            <div class="row justify-content-md-center text-center">
                <article class="col-3 card" v-for="car in getCars()">
                    <img src="https://cdn.autoportal.com/media/cache/image_360x180/img/new-cars-gallery/bmw/x1/height/bmw-x1-26230de7.jpg" />
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-12">
                                <b>BMW X1</b>
                            </div>
                        </div
                    ></div>
                    <div class="card-footer"><div class="row"><div class="col-6 text-left">
                                Koramangala
                            </div> <div class="col-6 text-right">
                                Rs. 2000
                    </div></div></div>
                    <div class="card-footer"><div class="row"><div class="col-6 text-left">
                                Petrol
                            </div> <div class="col-6 text-right">
                                Automatic
                    </div></div></div>
                    <div class="card-footer"><div class="row"><div class="col-12 text-center"><a href="#" target="_self" class="btn btn-primary">Select</a></div></div></div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['carsData'],
        data() {
            return {
                startDate: new Date(),
                cars: this.carsData,
            }
        },
        methods: {
            getCars: function() {
                console.log(this.cars);
                return this.cars.filter(function(car){
                    return true;
                })
            }
        }
    }
</script>
