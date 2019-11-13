/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:03:34
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-13 18:53:24
 * @description: 
 */
import header from "./header.vue";
import packageItem from "./Package.vue";
import evaluate from "@/components/product/CommentList.vue";
import ttz from "./Ttz.vue";
import cardDialog from "./Card.vue";
import ttzArgeement from "./TtzArgeement.vue";
import util from '@/plugin/Vincent/functions/index'
import { mapActions, mapState } from "vuex";
import {
    getProduct,
    getRecommend,
    getCollocation,
    addCart,
    updateCollectProduct,
    redirectProduct,
    queryMyTtzVip,
    queryIsTtzVip,
    createVipUser,
    querySalesAgreement,
    agreeSalesAgreement
} from '@/api/product'
import { GetUserInfo } from '@/api/login'
import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    ImagePreview
} from 'vant';
import inputNumber from "@/components/common/InputNumber.vue";
export default {
    name: 'productDetail',
    data() {
        return {
            isLoading: false,
            count: 0,
            showDrawer: false,
            iconList: {
                // home: HOME_ICON,
                // cart: CART_ICON
            },
            mask: true,
            article: "",
            swiperList: [],
            product: {},
            commentsRecords: [], //评价,
            skusList: [], //sku的组合
            selectSkuIndex: 0,//选中的sku索引
            buyNumber: 1,
            isCollection: false,
            orderType: 0, // 0默认下单  1 购物车
            currentSellerId: "", //上级id
            currentSellerShopId: "", //上级id
            promotion: null, // 活动类型
            recommendList: [], //推荐商品
            collocationList: [], //套餐搭配
            isTwitter: false,// 是否代理
            countBuy: 0, //商品已购数量
            limitAmount: 0, //限购数量
            showTtzAgreement: false,
            isAnyTtzVip: false, //是否已加入团团赚会员
            ttzVipLevel: '',//会员团团赚等级
            ttzPromotion: null, //团团赚会员优惠信息
            showCardDialog: false,//
            showShare: false, //显示分享弹窗
            showSales: false,//显示销售协议弹窗
            showSalesSwitch: false,//判断是否需要展示销售协议
            salesAgreementInfo: null,//销售协议相关信息
            showGuideShare: false, //分享引导弹层
            hasLogin: 0 //是否登录   0未登录  1 登录
        }
    },
    components: {
        "v-evaluate": evaluate,
        inputNumber,
        // "v-drawer": drawer,
        "v-head": header,
        "v-package": packageItem,
        "van-goods-action": GoodsAction,
        "van-goods-action-icon": GoodsActionIcon,
        "van-goods-action-button": GoodsActionButton,
        "v-ttz": ttz,
        "v-ttzArgeement": ttzArgeement,
        "v-cardDialog": cardDialog
    },
    watch: {
        selectSkuIndex: function (nVal, oVal) {
            let { skusList, product } = this;
            let sku = skusList[nVal];
            //设置当前sku的限购信息
            var countBuy = sku.countBuy || 0;
            var limitAmount = sku.limitAmount || 0;
            var pro_countBuy = product.countBuy;
            var pro_limitAmount = product.limitBuy;
            var limitNumber = 0;
            var canBuy = 0;
            //如果有设置商品的限购 需要对应的展示限购参数
            if (pro_limitAmount && pro_limitAmount != '0') {
                //设置了单sku限购数量限制
                if (limitAmount && limitAmount != 0) {
                    if (limitAmount > pro_limitAmount) {
                        limitNumber = pro_limitAmount
                    }
                    else {
                        limitNumber = limitAmount;
                    }
                    canBuy = limitAmount - countBuy
                }
                //仅设置了商品限购数
                else {
                    limitNumber = pro_limitAmount;
                    canBuy = pro_limitAmount - pro_countBuy;
                }
            }
            //无做任何限购处理
            else if (limitAmount && limitAmount != 0) {
                limitNumber = limitAmount;
                canBuy = limitAmount - countBuy;
            }
            this.countBuy = limitNumber - canBuy;
            this.limitAmount = limitNumber
        },
        isAnyTtzVip: function (nVal) {
            if (nVal) {
                let { ttzPromotion } = this
            }
        }
    },
    mounted() {
        console.log('加载完成')
    },
    computed: {
        ...mapState('Vincent', {
            shareInfo: state => state.wxShare.info
        }),
        productObj() {
            let { product } = this;
            return product;
        },
        //商品详情搜索对应的视频标签
        videoList() {
            return this.article.match(
                /https:\/\/video.gaindewo.com(([\s\S])*?).mp4/g
            );
        },
        isLimitFull() {
            //获取当前是否是多规格设置了限购数量或者已购数量已经超出了
            let { countBuy, limitAmount, buyNumber } = this;
            var amount = buyNumber;
            if (typeof countBuy !== 'undefined' && typeof limitAmount !== 'undefined' && limitAmount !== 0) {
                if (parseInt(amount) + parseInt(countBuy) > Number(limitAmount)) {
                    this.$toast('您所选规格数量已超出限购数量，不可购买！')
                    return false;
                }
            }
            return true;
        },
        //团团赚包裹补贴 分享弹窗展示对应等级的包裹补贴信息
        productPackageRebates() {
            let { isAnyTtzVip, ttzVipLevel, product } = this;
            let { productPackageRebates } = product;
            if (isAnyTtzVip && ttzVipLevel)
                return productPackageRebates.filter(item => item.vipType == ttzVipLevel);
            return [];
        }

    },

    methods: {
        ...mapActions("Vincent/wxShare", ["resetShareInfo"]),
        async login() {
            let res = await GetUserInfo({ loginName: 17625580369, password: '123456' })
            if (res.errorCode == 200) {
                this.hasLogin = 1
            }
            this.fresh()
        },
        onRefresh() {
            // this.fresh()
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.count++;
            }, 500);
        },
        closeDrawer() {
            this.showDrawer = !this.showDrawer;
        },
        showAllEvaluate() {

            var productId = this.product.id
            if (!this.hasLogin) {
                var goUrl = window.location.href;
                window.location.href = '/multiPlatLogin/toMultiPlatLogin?fromUrl=' + encodeURIComponent(goUrl);
                return;
            }

            window.location.href = '/shop#/evaluateDetail?productId=' + productId;
            // const userInfo = getStorageSync("userInfo");
            // if (!userInfo) {
            //     showConfirm({
            //         title: "登录提示",
            //         content: "您尚未登录，是否前往登录呢？",
            //         ok: () => {
            //             let url = getPagesInfo();
            //             wx.reLaunch({
            //                 url: "/pages/login/main?fromUrl=" + url
            //             });
            //         },
            //         cancel: () => { }
            //     });
            //     return;
            // }
            // wx.navigateTo({
            //     url: "/pages/evaluateDetail/main?productId=" + this.product.id
            // });
        },

        goNewPage(id) {
            console.log(id)
            this.$router.replace({
                name: 'productDetail',
                query: { id: id },
                params: {
                    time: new Date().getTime()
                }
            })
            // wx.navigateTo({
            //     url: "/pages/product/main?id=" + id
            // });
        },
        //判断当前团团赚商品选择的数量是否符合团团赚限购数量 
        isLimitFullForTtz() {
            if (!this.ttzPromotion) {
                return true;
            }
            let { buyNumber, skusList, selectSkuIndex, ttzVipLevel } = this;
            let max = 0, min = 0;
            if (ttzVipLevel == 'GOLD') {
                max = skusList[selectSkuIndex]['goldMaxBuyLimit']
                min = skusList[selectSkuIndex]['goldMinBuyLimit']
            }
            else if (ttzVipLevel == 'SILVER') {
                max = skusList[selectSkuIndex]['silverMaxBuyLimit']
                min = skusList[selectSkuIndex]['silverMinBuyLimit']
            }
            else {
                max = skusList[selectSkuIndex]['ordinaryMaxBuyLimit']
                min = skusList[selectSkuIndex]['ordinaryMinBuyLimit']
            }
            if (max && max != 0 && buyNumber > max) {
                this.$toast('您所选规格数量已超出最高起订量')
                return false;
            }
            else if (min && min != 0 && buyNumber < min) {
                this.$toast('您所选规格数量少于最低起订量')
                return false;
            }
            return true;
        },
        jumpCart() {
            this.$toast(String(this.$isFromApp))
            console.log(1111)
            // wx.switchTab({ url: "/pages/home/main" });
            // console.log(this.$isFromApp)
            if (this.$isFromApp) {
                try { window.goCart(); } catch (e) { }
                try { window.purchase.goCart() } catch (e) { }
            } else {
                window.location.href = "/shop#/car";
            }
        },
        //加入购物车
        addCart() {
            //判断是否需要展示销售协议
            if (this.showSalesSwitch) {
                this.showSales = true;
                return;
            }
            if (!this.isAnyTtzVip) {
                this.showTtzAgreement = true;
                return;
            }
            this.orderType = 1;
            this.showDrawer = true;
            // wx.switchTab({url:'/pages/cart/main'})
        },
        //想买
        wantBuy() {
            //判断是否需要展示销售协议
            if (this.showSalesSwitch) {
                this.showSales = true;
                return;
            }
            if (!this.isAnyTtzVip) {
                this.showTtzAgreement = true;
                return;
            }
            this.orderType = 0;
            this.showDrawer = true;
        },
        //预览sku图片
        previewImage() {
            let { skusList } = this;
            let data = [];
            skusList.map(item => {
                data.push(item.imgUrl);
            });
            ImagePreview({
                images: data,
            });

        },
        //改变购买数量
        setNumber(option) {
            console.log(option)
            let val = option.value;
            this.buyNumber = val;
        },
        selectSku(skuIndex) {
            this.selectSkuIndex = skuIndex;
            this.buyNumber = 1;
            console.log(this.skusList[skuIndex])
        },
        //查询销售协议
        async querySalesAgreement() {
            let res = await querySalesAgreement({ agreementType: 'PRODUCT_SALES' })
            if (res.errorCode == 200) {
                this.salesAgreementInfo = res.data
            }
        },
        //同意销售协议
        async agreeSales() {
            let res = await agreeSalesAgreement({ agreementType: 'PRODUCT_SALES' });
            if (res.errorCode == 200) {
                if (res.data) {
                    this.$toast('同意销售协议成功！');
                    this.showSalesSwitch = false;
                    this.showSales = false;
                }
                else {
                    this.$toast('同意销售协议失败，请重试！')
                }
            }
            else {
                this.$toast(res.moreInfo)
            }
        },
        //加入购物车 1||购买 0
        async addProduct() {
            // const userInfo = getStorageSync("userInfo");
            // if (!userInfo) {
            //     showConfirm({
            //         title: "登录提示",
            //         content: "您尚未登录，是否前往登录呢？",
            //         ok: () => {
            //             let url = getPagesInfo();
            //             wx.reLaunch({
            //                 url: "/pages/login/main?fromUrl=" + url
            //             });
            //         },
            //         cancel: () => { }
            //     });
            //     return;
            // }
            //判断当前商品是否超出限购
            if (!this.isLimitFull) return;
            //判断团团赚是否不符合最大 最小起订量
            if (!this.isLimitFullForTtz()) return;
            let skuId = this.skusList[this.selectSkuIndex]["id"];
            //是否混批标识
            let mixBatch = this.skusList[this.selectSkuIndex]["mixBatch"];
            let productId = this.product.id;
            let qty = this.buyNumber;
            //是否为复合商品，如果是跳转选择套餐
            let isBasicPro = this.product.combination;

            let { shopId } = this;
            //加入购物车
            if (this.orderType) {
                let data = {
                    skuId: skuId,
                    productId: productId,
                    amount: qty,
                    shopOwnerId: shopId,
                    type: "add"
                };

                // 如果时限购 加上活动id
                if (this.promotion && this.promotion.type == "LIMITBUY") {
                    data["promotionId"] = this.promotion.id;
                }
                //该商品为复合商品规格，需要选择对应sku
                if (isBasicPro == 1) {
                    let tmp = util.objToUrl(data);
                    //混批
                    if (mixBatch == 1) {
                        wx.navigateTo({
                            url:
                                "/pages/productMixBatch/main?params=" + encodeURIComponent(tmp)
                        });
                        //不混批
                    } else {
                        wx.navigateTo({
                            url:
                                "/pages/productPackage/main?params=" + encodeURIComponent(tmp)
                        });
                    }
                } else {
                    const response = await addCart(data);
                    if (response.errorCode == 200 && response.data) {
                        showToast({ title: "加入购物车成功！" });
                    } else {
                        showToast({ title: "加入购物车失败！" });
                    }
                }

                //直接下单
            } else {
                if (isBasicPro == 1) {
                    let data = {
                        skuId: skuId,
                        productId: productId,
                        amount: qty,
                        shopOwnerId: shopId,
                        type: "buy",
                        qty: qty
                    };
                    // 如果时限购 加上活动id
                    if (this.promotion && this.promotion.type == "LIMITBUY") {
                        data["promotionId"] = this.promotion.id;
                    }
                    //混批
                    if (mixBatch == 1) {
                        wx.navigateTo({
                            url:
                                "/pages/productMixBatch/main?params=" +
                                encodeURIComponent(util.objToUrl(data))
                        });
                        //不混批
                    } else {
                        // wx.navigateTo({
                        //     url:
                        //         "/pages/productPackage/main?params=" +
                        //         encodeURIComponent(util.objToUrl(data))
                        // });
                        window.location.href = '/cart/next?' + util.objToUrl(data)
                    }
                } else {
                    let params = `skuId=${skuId}&shopId=${shopId}&qty=${qty}&productId=${productId}`;
                    // 如果时限购 加上活动id
                    if (this.promotion && this.promotion.type == "LIMITBUY") {
                        params += `&promotionId=${this.promotion.id}`;
                    }
                    window.location.href = '/cart/next?' + params
                    // wx.navigateTo({
                    //     url: "/pages/orderConfirm/main?params=" + encodeURIComponent(params)
                    // });
                }
            }
        },
        //收藏商品
        async updateCollectStatus() {
            let { isCollection } = this;
            let type = isCollection ? "delete" : "save";
            let { id } = this.product;
            let res = await updateCollectProduct(type, { productId: id });
            if (res.errorCode == 200 && res.data) {
                this.$toast({
                    message: isCollection ? "取消收藏成功！" : "收藏成功！"
                });
                this.isCollection = !isCollection;
            } else {
                this.$toast({ title: res.moreInfo });
            }
        },
        init(response) {
            this.commentsRecords = [];
            this.swiperList = [];
            let _this = this;
            response.data.product &&
                response.data.product.imgs.map(item => {
                    this.swiperList.push({
                        imgUrl: `http://img.gaindewo.com/${item["img"]}`
                    });
                });
            // this.swiperList = [...response.data.imgsList];
            this.product = { ...response.data.product };
            this.isCollection = response.data.isCollection;
            this.ttzPromotion = response.data.ttzPromotion || null;
            this.article = this.product.fullText;
            this.isTwitter = response.data.isTwitter; //是否代理
            this.hasLogin = response.data.login;//是否登录
            this["shopId"] = response.data.shop.ownerId;
            this.skusList = this.product.skus.map(item => {
                item["spec"] = item["spec"].split(",").join("+");
                return item;
            });


            this.showSalesSwitch = !response.data.productSalesAgreement && response.data.productSalesAgreementSwitch;
            if (this.showSalesSwitch) {
                //查询销售协议内容
                this.querySalesAgreement();
            }
            //团团转商品判断
            if (response.data.product.ttzFlag) {
                this.queryIsAnyTtzVip()
            }
            else {
                this.isAnyTtzVip = true;
            }
            //预售商品判断
            if (response.data.product.isPresell) {
                this.promotion = {
                    type: "PRESELL",
                    presellType: response.data.product.presellVO.presellType
                };
                let date = new Date(this.product.presellVO.presellShipAt);
                this.promotion["shipMonth"] = date.getMonth() + 1;
                this.promotion["shipDay"] = date.getDate();

                this.promotion["resetStart"] = this.product.presellVO.restStartAt;
                this.promotion["resetEnd"] = this.product.presellVO.restEndAt;
            } else {
                this.promotion = response.data.promotion;
            }

            let commentsRecords = [...response.data.commentsRecords];
            commentsRecords.map((item, key) => {
                item["createdAt"] = item["createdAt"];
                item["buyerName"] = item["buyerName"];
                item["star"] = Number(item["star"]);
                _this.commentsRecords.push(item);
            });
            if (response.data.hasOwnProperty("currentSellerShopId")) {
                this.currentSellerShopId = response.data.currentSellerShopId;
            }
            if (response.data.hasOwnProperty("currentSellerId")) {
                this.currentSellerId = response.data.currentSellerId;
            }

            //重置分享信息
            this.resetShareInfo({ title: this.product.name, imgUrl: this.product.imgUrl, link: response.data.shareUrl })
        },
        //初始化团团转商品信息
        async initTtz() {
            let res = await queryMyTtzVip();
            if (res.errorCode == 200 && res.data) {
                this.ttzVipLevel = res.data.vipLevel
            }
        },
        //查询是否是团团转会员
        async queryIsAnyTtzVip() {
            let res = await queryIsTtzVip();
            if (res.errorCode == 200 && res.data) {
                this.isAnyTtzVip = true;
                this.initTtz()
            }
        },
        //创建普通会员 如果是选择非普通会员进行下一步操作
        async createVipUser(cardType) {
            let res = await createVipUser();
            if (res.errorCode == 200 && res.data) {
                this.showTtzAgreement = false
                if (cardType == 'normal') {
                    this.$toast('加入团团赚普通会员成功！');
                    this.isAnyTtzVip = true;
                    this.ttzVipLevel = 'ORDINARY'
                }
                else {
                    window.location.href = '/ttz/confirm?grade=' + cardType + '&status=buy'
                }
            }
            else {
                this.$toast(res.moreInfo)
            }
        },
        //请求商品数据重定向请求
        async redirectInit(url) {
            let u = url.split('?')[0]
            let promotionId = url.split('?')[1].split('=')[1]
            let res = await redirectProduct(u, { promotionId: promotionId });
            if (res.errorCode == 200) {
                this.init(res);
            }
        },
        //初始化商品数据
        async initProduct(params) {
            const response = await getProduct(params.id, params);

            if (response.errorCode == 200) {
                this.init(response);
            } else if (response.errorCode == 302) {
                let url = response.moreInfo;
                this.redirectInit(url);
            }
        },
        //获取推荐商品
        async getRecommend(id) {
            const response = await getRecommend({ productId: id });
            if (response.errorCode == 200 && response.data.length) {
                this.recommendList = [...response.data];
            }
        },
        async getCollocation(id) {
            const response = await getCollocation({ productId: id });
            if (response.errorCode == 200 && response.data.length) {
                this.collocationList = [...response.data];
            }
        },
        jumpHome() {
            this.$toast(String(this.$isFromApp))
            if (!this.$isFromApp) {
                window.location.href = '/shop#/'
            }
            else {
                try { goHome(); } catch (e) { }
                try { window.purchase.goHome() } catch (e) { }
            }
        },
        //点击分享按钮 微信 朋友圈之类
        sharingChannels() {
            this.$toast(String(this.$isFromApp))
            if (!this.$isFromApp) {
                this.showShare = false;
                this.showGuideShare = true;
            }
        },
        //分享按钮
        sharePd() {

            if (!this.$isFromApp) {
                this.showShare = true;
            }
            else {

                let { product, isAnyTtzVip, shareInfo, productPackageRebates } = this;

                //团团赚商品
                if (product.ttzFlag) {
                    //未加入团团赚会员  弹窗先同意一种会员
                    if (!isAnyTtzVip) {
                        this.showTtzAgreement = true;
                        return;
                    }
                    try {
                        newshareWechat(shareInfo.title, shareInfo.link, shareInfo.imgUrl, JSON.stringify(productPackageRebates));
                    } catch (e) {
                    }
                    try {
                        window.purchase.newshareWechat(shareInfo.title, shareInfo.link, shareInfo.imgUrl, JSON.stringify(productPackageRebates))
                    } catch (e) {
                    }
                }
                else {
                    try {
                        shareWechat(shareInfo.title, shareInfo.link, shareInfo.imgUrl);
                    } catch (e) {
                    }
                    try {
                        window.purchase.shareWechat(shareInfo.title, shareInfo.link, shareInfo.imgUrl)
                    } catch (e) {
                    }
                }
            }
        },
        //刷新执行的初始化函数
        fresh() {
            if (this.$route.query.params) {
                let params = util.formatParams(this.$route.query.params);
                this.initProduct(params);
                this.getRecommend(params.id);
                this.getCollocation(params.id);
            } else {
                let id = this.$route.query.id;
                this.initProduct({ id: id });
                this.getRecommend(id);
                this.getCollocation(id);
            }
        },
        //处理邀请分享的参数问题
        setShareInfo() {
            // currentSellerShopId
            // currentSellerId
            //存储json对象{currentSellerShopId:'',currentSellerId:''}
            var localParam = localStorage.getItem('inviteParam');
            var currentSellerShopId = util.formatParams('currentSellerShopId');
            var currentSellerId = util.formatParams('currentSellerId');
            if ((!localParam) && (currentSellerShopId || currentSellerId)) {
                localStorage.setItem('inviteParam', JSON.stringify({ currentSellerShopId: currentSellerShopId, currentSellerId: currentSellerId }))
            }
        }
    },
    created() {
        if (this.$env == 'development') {
            this.login()
        }
        else {
            this.fresh();
        }
        this.setShareInfo()
    }
}