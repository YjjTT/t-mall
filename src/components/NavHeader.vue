<template>
    <div class="header">
        <div class="nav-tapbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="tapbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="goToLogin">登录</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                    <a href="javascript:;" v-if="username" @click="goToOrder">我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item, index) in phoneList" :key="index">
                                    <a v-bind:href="'/#/product/'+item.id" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">Redmi 智能电视 MAX 98"</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0112cb7e2ea8489fbd36ce3a781d5232.jpg" alt="">
                                        </div>
                                        <div class="pro-name">Redmi 智能电视 MAX 98"</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0112cb7e2ea8489fbd36ce3a781d5232.jpg" alt="">
                                        </div>
                                        <div class="pro-name">Redmi 智能电视 MAX 98"</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0112cb7e2ea8489fbd36ce3a781d5232.jpg" alt="">
                                        </div>
                                        <div class="pro-name">Redmi 智能电视 MAX 98"</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0112cb7e2ea8489fbd36ce3a781d5232.jpg" alt="">
                                        </div>
                                        <div class="pro-name">Redmi 智能电视 MAX 98"</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0112cb7e2ea8489fbd36ce3a781d5232.jpg" alt="">
                                        </div>
                                        <div class="pro-name">Redmi 智能电视 MAX 98"</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" name="keyword">
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "nav-header",
        data() {
            return{
                phoneList: []
            }
        },
        mounted() {
            this.getProductList();
            let params = this.$route.params
            if (params && params.from === 'login') {
                this.getCardCount();
            }
        },
        computed: {
            // username() {
            //     return this.$store.state.username;
            // },
            // cartCount() {
            //     return this.$store.state.cartCount;
            // }
            ...mapState(['username', 'cartCount'])
        },
        filters: {
            currency(val) {
                if (!val) return '0.00';
                return '$' + val.toFixed(2) + '元';
            }
        },
        methods: {
            getProductList() {
                this.axios.get('/products', {
                    params: {
                        categoryId: '100012'
                    }
                }).then((res) => {
                    this.phoneList = res.list;
                })
            },
            goToCart() {
                this.$router.push('/cart');
            },
            goToLogin() {
                this.$router.push('/login');
            },
            logout() {
                this.axios.post('/user/logout').then(()=>{
                    this.$message.success('退出成功');
                    this.$cookie.set('userId', '', {expires: '-1'});
                    this.$store.dispatch('saveUserName', '');
                    this.$store.dispatch('saveCartCount', 0);
                })
            },
            getCardCount() {
                this.axios.get('/carts/products/sum').then((res=0) => {
                    this.$store.dispatch('saveCartCount', res)
                })
            },
            goToOrder() {
                this.$router.push('/order/list');
            }
        }
    }
</script>

<style lang="scss">
    @import './src/assets/scss/base.scss';
    @import './src/assets/scss/mixin.scss';
    @import './src/assets/scss/config.scss';
    .header {
        .nav-tapbar {
            height: 39px;
            line-height: 39px;
            background-color: #333333;
            color: #B0B0B0;
            .container {
                @include flex();
                a{
                    display: inline-block;
                    color: #B0B0B0;
                    margin-right: 17px;
                }
                .my-cart {
                    width: 110px;
                    background-color: #FF6600;
                    text-align: center;
                    color: #ffffff;
                    .icon-cart {
                        @include bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
                        margin-right: 4px;
                    }
                }
            }
        }
        .nav-header {
            .container {
                position: relative;
                height: 112px;
                @include flex();
                .header-menu {
                    display: inline-block;
                    width: 643px;
                    padding-left: 209px;
                    .item-menu {
                        display: inline-block;
                        color: #333333;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 112px;
                        margin-right: 20px;
                        span {
                            cursor: pointer;
                        }
                        &:hover {
                            color: $colorA;
                            .children {
                                height: 220px;
                                opacity: 1;
                            }
                        }
                        .children {
                            position: absolute;
                            top: 112px;
                            left: 0;
                            width: 1226px;
                            height: 0;
                            opacity: 0;
                            overflow: hidden;
                            border-top: 1px solid #e5e5e5;
                            box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
                            z-index: 10;
                            transition: height .5s;
                            background-color: #ffffff;
                            .product {
                                position: relative;
                                float: left;
                                width: 16.6%;
                                height: 220px;
                                font-size: 12px;
                                line-height: 12px;
                                text-align: center;
                                a {
                                    display: inline-block;
                                }
                                img {
                                    width: auto;
                                    height: 111px;
                                    margin-top: 26px;
                                }
                                .pro-img {
                                    max-width: 100%;
                                    max-height: 100%;
                                }
                                .pro-name {
                                    font-weight: bold;
                                    margin-top: 19px;
                                    color: $colorB;
                                    margin-bottom: 8px;
                                }
                                .pro-price {
                                    color: $colorA;
                                }
                                &:before {
                                    position: absolute;
                                    content: ' ';
                                    top: 28px;
                                    right: 0;
                                    border-left: 1px solid $colorF;
                                    height: 100px;
                                    width: 1px;
                                }
                                &:last-child:before {
                                    display: none;
                                }
                            }
                        }
                    }
                }
                .header-search {
                    width: 319px;
                    .wrapper {
                        height: 50px;
                        border: 1px solid #E0E0E0;
                        display: flex;
                        align-items: center;
                        input {
                            border: none;
                            box-sizing: border-box;
                            border-right: 1px solid #E0E0E0;
                            width: 264px;
                            height: 50px;
                            padding-left: 14px;
                        }
                        a {
                            @include bgImg(18px, 18px, '/imgs/icon-search.png');
                            margin-left: 17px;
                        }
                    }
                }
            }
        }
    }
</style>
