<template>
    <div class="modal-edit-address" v-show="hide">
        <div class="modal-header">
            <span class="title">{{title}}</span>
            <a class="close" @click="cancelAddress"><i class="iconfont"></i></a>
        </div>
        <div class="modal-body">
            <div class="form-box clearfix">
                <div class="form-section form-name form-section-valid ">
                    <label class="input-label" for="user_name">姓名</label>
                    <input class="input-text " type="text" id="user_name" @focus="inputFocus($event)"
                           @blur="inputBlur($event)"
                           v-model="address.name"
                    >
                </div>
                <div class="form-section form-phone form-section-valid ">
                    <label class="input-label" for="user_phone">手机号</label>
                    <input class="input-text" type="text" id="user_phone" @focus="inputFocus($event)"
                           @blur="inputBlur($event)"
                           v-model="address.phoneNumber"
                    >
                </div>
                <div class="form-section form-four-address form-section-active form-section-valid">
                    <input id="J_selectAddressTrigger" class="input-text active" type="text"
                           @click="showSelectwrapper"
                           name="four_address" readonly="readonly" :value="fourAddress"
                    >
                    <i class="iconfont"></i>
                </div>
                <div class="form-section form-address-detail  form-section-valid">
                    <label class="input-label" for="user_adress">详细地址</label>
                    <textarea class="input-text" type="text" id="user_adress" @focus="inputFocus($event)"
                              @blur="inputBlur($event)"
                              v-model="address.detailAddress"
                    ></textarea>
                </div>
                <div class="form-section form-tag form-section-valid">
                    <label class="input-label" for="user_tag">地址标签</label>
                    <input class="input-text" type="text" id="user_tag" @focus="inputFocus($event)"
                           @blur="inputBlur($event)"
                           v-model="address.tag"
                    >
                </div>
                <div class="form-section form-tip-msg clearfix" id="J_formTipMsg"></div>
            </div>

            <div class="select-address-wrapper" :class="{'hide':hideSelectWrapper}">
                <span class="select-address-close" @click="closeSelectWrapper">x</span>
                <div class="four-address-wrapper" :class="{'hide':hideSelectWrapper}" data-type="select">
                    <div id="J_fourAddressWrapper">
                        <div class="select-box clearfix">
                            <div class="select-first select-item" data-init-txt="选择省份/自治区">{{address.province}}</div>
                            <div class="select-item  " data-init-txt="选择城市/地区">{{address.city}}</div>
                            <div class="select-item  " data-init-txt="选择区县">{{address.region}}</div>
                            <div class="select-last select-item" data-init-txt="选择配送区域">{{address.street}}</div>
                        </div>
                        <div class="options-box">
                            <ul class="options-list  clearfix" v-show="showProvince">
                                <li class="option " v-for="(item,index) in province" :key="index"
                                    @click="selectProvince(item)">{{item.name}}
                                </li>
                            </ul>
                            <ul class="options-list clearfix" v-show="showCity">
                                <li class="option" v-for="(item,index) in city" :key="index"
                                    @click="selectCity(item)"
                                >{{item.name}}
                                </li>
                            </ul>
                            <ul class="options-list clearfix" v-show="showRegion">
                                <li class="option" v-for="(item,index) in region" :key="index"
                                    @click="selectRegion(item)"
                                >{{item.name}}
                                </li>
                            </ul>
                            <ul class="options-list clearfix" v-show="showStreet">
                                <li class="option" v-for="(item,index) in street" :key="index"
                                    @click="selectStreet(item)"
                                >{{item.name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="switch-type">
                        <a href="javascript:void(0);" class="J_switchTypeTrigger" data-type="search"
                           data-stat-id="6c0c16e4a3502fe8"
                           onclick="_msq.push(['trackEvent', '17a1f380b9d4cd2e-6c0c16e4a3502fe8', 'javascript:void0', 'pcpid', '']);">
                            搜索地址快速定位&gt;</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="javascript:void(0);" class="btn btn-primary" @click="handleFinishCommit">保存</a>
            <a href="#J_modalEditAddress" class="btn btn-gray" @click="cancelAddress">取消</a>
        </div>
    </div>
</template>

<script>

    import axios from 'axios'

    const request = axios.create({
        baseURL: process.env.JSON_API,
        timeout: 5000,
        headers: {'Content-type': 'multipart/form-data'}
    })
    export default {
        name: "AddressDetail",
        props: {
            title: {
                type: String,
                default: '添加收货地址'
            },
            address: {
                name: null,
                province: null,
                city: null,
                region: null,
                street: null,
                detailAddress: null,
                tag: null,
                phoneNumber: null,

            },
            hide: true
        },
        data() {
            return {
                cityData: null,
                province: [{
                    code: null,
                    name: null
                }],//省
                city: [{
                    code: "1101",
                    name: "市辖区",
                    provinceCode: "11"
                }],//市
                region: [{
                    code: "110101",
                    name: "东城区",
                    cityCode: "1101",
                    provinceCode: "11"
                }],//区
                street: [{
                    code: "110101001",
                    name: "东华门街道",
                    areaCode: "110101",
                    cityCode: "1101",
                    provinceCode: "11"
                }],//街道
                hideSelectWrapper: true,
                currentProvinceCode: null,
                currentCityCode: null,
                showProvince: true,
                showCity: false,
                showRegion: false,
                showStreet: false

            }
        },
        methods: {
            getJSonData() {
                request.get('/static/json/city.json').then((res) => {
                    this.cityData = res.data
                    this.province = this.cityData.province
                    /*this.province = res.data.province
                    this.city = res.data.city
                    this.region = res.data.region
                    this.street = res.data.street*/
                })
            },
            showSelectwrapper() {
                this.getJSonData()
                this.hideSelectWrapper = false
                this.address.province = null
                this.address.city = null
                this.address.region = null
                this.address.street = null
                this.showProvince = true
                this.showCity = false
                this.showRegion = false
                this.showStreet = false
            },
            closeSelectWrapper() {
                this.hideSelectWrapper = true

            },
            inputFocus(e) {
                e.target.parentNode.classList.add('form-section-focus', 'form-section-active')
            },
            inputBlur(e) {
                let id = e.target.id
                if (id === 'user_name') {
                    if (this.address.name == null || this.address.name.trim() === '') {
                        e.target.parentNode.classList.remove('form-section-active')
                    }
                } else if (id === 'user_phone') {
                    if (this.address.phoneNumber == null || this.address.phoneNumber.trim() === '') {
                        e.target.parentNode.classList.remove('form-section-active')
                    }
                } else if (id === 'user_adress') {
                    if (this.address.detailAddress == null || this.address.detailAddress.trim() === '') {
                        e.target.parentNode.classList.remove('form-section-active')
                    }
                } else if (id === 'user_tag') {
                    if (this.address.tag == null || this.address.tag.trim() === '') {
                        e.target.parentNode.classList.remove('form-section-active')
                    }
                }
                e.target.parentNode.classList.remove('form-section-focus')

            },
            selectProvince(item) {
                this.address.province = item.name
                this.city = this.cityData.city.filter((e) => {
                    return e.provinceCode === item.code
                })
                this.showProvince = false
                this.showCity = true
            },
            selectCity(item) {
                this.address.city = item.name
                this.region = this.cityData.region.filter((e) => {
                    return e.cityCode === item.code
                })
                this.showCity = false
                this.showRegion = true
            },
            selectRegion(item) {
                this.address.region = item.name
                this.street = this.cityData.street.filter((e) => {
                    return e.areaCode === item.code
                })
                this.showRegion = false
                this.showStreet = true
            },
            selectStreet(item) {
                this.address.street = item.name
                this.showRegion = false
                this.showStreet = false
                this.closeSelectWrapper()
            },
            handleFinishCommit() {
                this.$emit('finishCommit')
            },
            cancelAddress() {
                this.$emit('closeAddressDetail')
            }

        },
        computed: {
            fourAddress: function () {
                if (this.address.province == null || this.address.province == 'null'/*|| this.address.city == null || this.address.region == null || this.address.street == null*/) {
                    return '选择省 / 市 / 区 / 街道'
                } else {
                    return this.address.province + ' ' + this.address.city + ' ' + this.address.region + ' ' + this.address.street
                }
            }
        }
        ,
        created() {
            this.getJSonData()
        }
    }
</script>

<style lang="scss">
    .modal-edit-address {
        width: 660px;
        height: 460px;
        margin-left: -330px;
        margin-top: -230px;
        -webkit-box-shadow: 0 18px 30px rgba(0, 0, 0, 0.18);
        box-shadow: 0 18px 30px rgba(0, 0, 0, 0.18);
        position: fixed !important;
        top: 50%;
        left: 50%;
        _position: absolute;
        _top: 15%;
        _margin-top: 0;
        z-index: 1050;
        background-color: #fff;
        outline: none;

        .modal-header {
            position: relative;
            height: 32px;
            padding: 14px 20px;
            background-color: #f5f5f5;

            .title {
                margin: 0;
                font-size: 18px;
                font-weight: 400;
                line-height: 32px;
                color: #424242;
            }

            .close {
                position: absolute;
                top: 14px;
                right: 14px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #757575;
                cursor: pointer;
                -webkit-transition: all .2s;
                transition: all .2s;
                z-index: 10;
                border-radius: 15px;

                &:hover {
                    color: #fff;
                    background-color: #e53935;
                }
            }
        }

        .modal-body {
            position: relative;
            padding: 40px 40px 0 40px;
            height: 280px;
            max-height: none;

            .form-box {
                .form-section {
                    position: relative;
                    margin: 0 0 14px;
                    padding: 0;
                    border: 0;
                    text-align: left;
                    float: left;

                    .input-label {
                        position: absolute;
                        left: 12px;
                        top: 11px;
                        z-index: 2;
                        padding: 0 3px;
                        font-size: 14px;
                        line-height: 18px;
                        color: #b0b0b0;
                        background: transparent;
                        cursor: text;
                        -webkit-transition: all .2s linear;
                        transition: all .2s linear;
                    }

                    .input-text {
                        width: 249px;
                        height: 18px;
                        padding: 10px 16px;
                        border: 1px solid #e0e0e0;
                        font-size: 14px;
                        line-height: 18px;
                        background: #fff;
                        -webkit-transition: border-color .2s linear;
                        transition: border-color .2s linear;
                        margin: 0;
                        vertical-align: baseline;
                    }
                }

                .form-name {
                    margin-right: 14px;
                }

                .form-four-address {
                    cursor: pointer;
                    width: 100%;

                    input {
                        outline: none;
                        cursor: pointer;
                        width: 546px !important;
                    }

                    .iconfont {
                        position: absolute;
                        top: 50%;
                        right: 6px;
                        height: 24px;
                        line-height: 24px;
                        margin-top: -12px;
                        font-size: 24px;
                        color: #b0b0b0;
                    }

                }

                .form-address-detail {
                    width: 100%;

                    textarea {
                        width: 546px !important;
                        height: 3em !important;
                        resize: vertical !important;
                    }
                }

                .form-tag {
                    input {
                        width: 546px !important;
                    }
                }
            }

            .select-address-wrapper {
                position: absolute;
                top: 87px;
                left: 40px;
                width: 578px;
                height: 257px;
                padding-top: 40px;
                border: 1px solid #ff6700;
                background-color: #fff;
                z-index: 3;

                .select-address-close {
                    position: absolute;
                    top: 10px;
                    right: 6px;
                    width: 24px;
                    color: #b0b0b0;
                    cursor: pointer;
                    line-height: 1;
                    text-align: center;
                }

                .four-address-wrapper {
                    width: 538px;
                    height: 250px;
                    margin: 0 20px;

                    .select-box {
                        padding: 6px 0;
                        border-bottom: 1px solid #e0e0e0;

                        .select-item {
                            float: left;
                            height: 30px;
                            line-height: 30px;
                            margin-right: 5%;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            _zoom: 1;
                            color: #ff6700;
                        }

                        .active {
                            cursor: pointer;
                            color: #424242;
                        }
                    }

                    .options-box {
                        margin-bottom: 10px;
                        width: 538px;
                        height: 145px;

                        .options-list {
                            margin: 0;
                            padding: 20px 0;
                            list-style: none;

                            li {
                                cursor: pointer;
                                float: left;
                                margin-right: 14px;
                                margin-bottom: 14px;

                                &:hover {
                                    text-decoration: underline;
                                    color: #ff6700;
                                }
                            }
                        }
                    }
                }

                .switch-type {
                    padding: 20px 0;
                    border-top: 1px solid #e0e0e0;

                    a {
                        color: #ff6700;
                    }
                }

            }
        }

        .modal-footer {
            height: 40px;
            padding: 20px 0;
            text-align: center;
            background-color: #f5f5f5;
            *zoom: 1;
            border: none;

            .btn {
                display: inline-block;
                *zoom: 1;
                *display: inline;
                width: 158px;
                height: 38px;
                padding: 0;
                border: 1px solid #b0b0b0;
                font-size: 14px;
                line-height: 38px;
                text-align: center;
                color: #b0b0b0;
                cursor: pointer;
                -webkit-transition: all .4s;
                transition: all .4s;
                margin: 0 7px;
            }

            .btn-primary {
                background: #ff6700;
                border-color: #ff6700;
                color: #fff;

                &:hover {
                    background-color: #f25807;
                    border-color: #f25807;
                    color: #fff;
                }
            }

            .btn-gray {
                color: #fff;
                background: #b0b0b0;

                &:hover {
                    background-color: #757575;
                    border-color: #757575;
                    color: #fff;
                }
            }
        }
    }
</style>