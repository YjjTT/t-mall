<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="/imgs/logo-footer.png" alt="">
            <p>小米商城</p>
        </div>
        <div class="footer-link">
            <a href="" target="_blank">阿斯达大所大</a><span>|</span>
            <a href="" target="_blank">阿斯达大所大</a><span>|</span>
            <a href="" target="_blank">阿斯达大所大</a><span>|</span>
            <a href="" target="_blank">阿斯达大所大</a>
        </div>
        <div class="copyright">Copyright @2020 <span class="domain">yjjtt.top</span> All Rights Reserved</div>
    </div>
</template>

<script>
    export default {
        name: "nav-footer"
    }
</script>

<style lang="scss">
    @import './src/assets/scss/base.scss';
    @import './src/assets/scss/mixin.scss';
    @import './src/assets/scss/config.scss';
    .footer {
        height: 234px;
        border-top: 4px solid $colorA;
        background-color: $colorB;
        color: #999999;
        font-size: 16px;
        text-align: center;
        .footer-logo {
            margin-top: 46px;
            margin-bottom: 31px;
            img {
                width: 53px;
                height: 36px;
                margin-bottom: 13px;
            }
        }
        .footer-link {
            margin-bottom: 13px;
            a {
                color: #999999;
                display: inline-block;
            }
            span {
                margin: 0 10px;
            }
        }
        .copyright {
            .domain {
                color: $colorA;
            }
        }
    }
</style>
