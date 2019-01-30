<template>
    <div class="search-wrapper">
        <div class="form-group">
            <div class="row justify-content-center">
                <label class="search-title"><b>Choose Your Location</b></label>
            </div>
            <div class="row justify-content-center">
                <b-card-group deck>
                    <b-card
                        title=""
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                        <input type="button" class="btn btn-location"
                            v-on:click="selectLocation($event, 'Koramangala')"
                            v-bind:class="{ active: location=='Koramangala'}"
                            value="Koramangala" />
                    </b-card>
                    <b-card
                        title=""
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                        <input type="button" class="btn btn-location"
                            v-on:click="selectLocation($event, 'HSR Layout')"
                            v-bind:class="{ active: location=='HSR Layout'}"
                            value="HSR Layout" />
                    </b-card>
                    <b-card
                        title=""
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                        <input type="button" class="btn btn-location"
                            v-on:click="selectLocation($event, 'Indiranagar')"
                            v-bind:class="{ active: location=='Indiranagar'}"
                            value="Indiranagar" />
                    </b-card>
                </b-card-group>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-12 col-md-3">
                    <label><b>Pickup Date</b></label>
                    <div class="form-group">
                        <datepicker v-model="startDate" placeholder="Pickup Date"
                        input-class="form-control"></datepicker>
                    </div>
                </div>
                <div class="col-12 col-md-3">
                    <label><b>Dropoff Date</b></label>
                    <div class="form-group">
                        <datepicker v-model="endDate" placeholder="Dropoff Date"
                        input-class="form-control"></datepicker>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <button type="button" class="btn btn-secondary btn-lg btn-do-search"
                v-on:click="doSearch()">Search</button>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';

    export default {
        components: {
            Datepicker
        },
        props: [ 'parentDoSearch' ],
        data() {
            return {
                startDate: new Date(),
                endDate: new Date(),
                location: ''
            }
        },
        methods: {
            selectLocation: function(e, location) {

                e.currentTarget.classList.add('active');
                this.location = location;
            },
            doSearch: function(e) {
                this.$parent.doSearch(
                    e,
                    this.location,
                    this.startDate,
                    this.endDate
                );
            }
        }
    }
</script>
