<template>
    <div>
        <nav class="navbar navbar-dark bg-transparent fixed-top">
            <h3 class="navbar-brand">Car Rentals</h3>
            <span class="navbar-text">
                Welcome {{userSessionInfo.fullname ? userSessionInfo.fullname : 'Guest'}}
            </span>
        </nav>
        <div class="container-fluid">
            <b-modal ref="loginModal" hide-footer title="Login">
                <div class="d-block">
                    <label class="text-success">{{successMessage}}</label>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" placeholder="Email"
                            v-model="userLoginInfo.username" />
                        <label class="text-danger" v-if="loginErrors.username">{{loginErrors.username}}</label>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Password"
                            v-model="userLoginInfo.password" />
                        <label class="text-danger" v-if="loginErrors.password">{{loginErrors.password}}</label>
                    </div>
                    <div class="form-group text-center">
                        <input type="button" value="Login" class="btn btn-primary"
                            v-on:click="doLogin($event)" />
                        <a href="javascript:;" v-on:click="showRegister()">Create account</a>
                    </div>
                </div>
            
            </b-modal>
            <b-modal ref="registerModal" hide-footer title="Register">
                <div class="d-block">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-control" placeholder="Full Name"
                            v-model="userRegisterInfo.fullname" />
                        <label class="text-danger" v-if="errors.fullname">{{errors.fullname}}</label>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" placeholder="Email"
                            v-model="userRegisterInfo.username" />
                        <label class="text-danger" v-if="errors.username">{{errors.username}}</label>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Password"
                            v-model="userRegisterInfo.password" />
                        <label class="text-danger" v-if="errors.password">{{errors.password}}</label>
                    </div>
                    <div class="form-group text-center">
                        <input type="button" value="Register" class="btn btn-primary"
                            v-on:click="doRegister($event)" />
                        <a href="javascript:;" v-on:click="showLogin()">Back to Login</a>
                    </div>
                </div>
            
            </b-modal>
            <RouterView :bus="bus" />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { config } from './constants';
    export default {
        data() {
            return {
                isLoggedIn: false,
                userSessionInfo: {},
                successMessage: '',
                userRegisterInfo: {
                    fullname: '',
                    username: '',
                    password: ''
                },
                userLoginInfo: {
                    username: '',
                    password: ''
                },
                errors: {
                    fullname: '',
                    username: '',
                    password: ''
                },
                loginErrors: {
                    username: '',
                    password: ''
                },
                bus: new Vue()
            }
        },
        methods: {
            isUserLoggedIn() {
                return this.isLoggedIn;
            },
            showLogin() {
                this.userRegisterInfo = {};
                this.userLoginInfo = {};
                this.$refs.registerModal.hide();
                this.$refs.loginModal.show()
            },
            showRegister() {
                this.userRegisterInfo = {};
                this.userLoginInfo = {};
                this.$refs.registerModal.show();
                this.$refs.loginModal.hide();
            },
            doRegister(e) {
                this.errors = {};
                this.successMessage = '';
                if (!this.userRegisterInfo.fullname) {
                    this.errors['fullname'] = 'Please enter your full name'
                }
                if (!this.userRegisterInfo.username) {
                    this.errors['username'] = 'Please enter your email'
                }
                if (!this.userRegisterInfo.password) {
                    this.errors['password'] = 'Please enter password'
                }
                if (Object.keys(this.errors).length > 0) {
                    return;
                }
                
                fetch(config.apiBaseUrl + 'user/signup', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': '*'
                        // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: JSON.stringify(this.userRegisterInfo)
                })
                .then(res => res.json())
                .then(response => {
                    if (response.status && response.message) {
                        this.userRegisterInfo = {};
                        this.successMessage = response.message;
                        this.showLogin();
                    } else {
                        this.errors['password'] = 'Error occured while creating account';
                    }
                })
                .catch(error => console.error(error));
            },
            doLogin(e) {
                var self = this;
                this.errors = {};
                this.successMessage = '';
                if (!this.userLoginInfo.username) {
                    this.loginErrors['username'] = 'Please enter your email'
                }
                if (!this.userLoginInfo.password) {
                    this.loginErrors['password'] = 'Please enter password'
                }
                if (Object.keys(this.errors).length > 0) {
                    return;
                }
                
                fetch(config.apiBaseUrl + 'user/signin', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': '*'
                    },
                    body: JSON.stringify(this.userLoginInfo)
                })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    if (response.status && response.message && response.user) {
                        this.userSessionInfo = response.user;
                        this.isLoggedIn = true;
                        localStorage.setItem('userLoggedIn', 'true');
                        localStorage.setItem('userSession', JSON.stringify(response.user));
                        this.$refs.loginModal.hide();
                        this.$refs.registerModal.hide();
                        this.bus.$emit('userLoggedIn')
                    } else {
                        this.loginErrors['password'] = 'Incorrect username or password';
                    }
                })
                .catch(error => console.error(error));
            }
        },
        mounted() {
            let loggedin = localStorage.getItem('userLoggedIn');
            this.isLoggedIn = (loggedin && (loggedin == true || loggedin == 'true')) ? true : false;

            if (this.isLoggedIn) {
                this.userSessionInfo = JSON.parse(localStorage.getItem('userSession'));
            }

            console.log(this.userSessionInfo);
        }
    }
</script>
