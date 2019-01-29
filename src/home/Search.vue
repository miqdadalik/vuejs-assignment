<template>
    <div class="search-wrapper">
        <div class="form-group">
            <div class="row justify-content-md-center">
                <label><b>Choose Your Location</b></label>
            </div>
            <div class="row justify-content-md-center">
                <b-card-group deck>
                    <b-card
                        title=""
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                        <b-button href="#" variant="primary">Koramangala</b-button>
                    </b-card>
                    <b-card
                        title=""
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                        <b-button href="#" variant="primary">HSR Layout</b-button>
                    </b-card>
                    <b-card
                        title=""
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                        <b-button href="#" variant="primary">Indiranagar</b-button>
                    </b-card>
                </b-card-group>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-3">
                    <label><b>Pickup Date</b></label>
                    <div class="form-group">
                        <datepicker v-model="startDate" placeholder="Pickup Date"
                        input-class="form-control"></datepicker>
                    </div>
                </div>
                <div class="col-3">
                    <label><b>Dropoff Date</b></label>
                    <div class="form-group">
                        <datepicker v-model="startDate" placeholder="Dropoff Date"
                        input-class="form-control"></datepicker>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <button type="button" class="btn btn-secondary btn-lg"
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
                startDate: new Date()
            }
        },
        methods: {
            doSearch: function(e) {
                this.$parent.doSearch(e);
            }
        }
    }
</script>
