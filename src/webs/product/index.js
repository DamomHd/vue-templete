/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 14:03:34
 * @LastEditors  : vincent_Huanghd@126.com
 * @LastEditTime : 2019-12-25 21:09:26
 * @description: 
 */
import header from "./header.vue";
// import packageItem from "./Package.vue";
// import evaluate from "@/components/product/CommentList.vue";
// import ttz from "./Ttz.vue";
// import cardDialog from "./Card.vue";
// import ttzArgeement from "./TtzArgeement.vue";
import util from '@/plugin/Vincent/functions/index'
import { isAndroid } from '@/plugin/Vincent/functions/ua'
import { mapMutations, mapState } from "vuex";
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
    agreeSalesAgreement,
    getBarainShareUrl,
    getCardProductUrl
} from '@/api/product'
import { GetUserInfo } from '@/api/login'
import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Stepper
} from 'vant';
import inputNumber from "@/components/common/InputNumber.vue";
export default {
    name: 'productDetail',
    data() {
        return {
            isAndroid: isAndroid,
            isIniting: true, //是否初始化加载中 控制骨架屏
            isLoading: false, //是否在下拉刷新
            headerInfo: [
                {
                    value: 'PRODUCT',
                    name: '商品'
                },
                {
                    value: 'EVALUATE',
                    name: '评价'
                },
                {
                    value: 'DETAIL',
                    name: '详情'
                }
            ],
            headerActive: true,
            headerTabVal: 'PRODUCT',//头部商品PRODUCT 评价EVALUATE 详情DETAIL切换
            isHandleSkuFromItem: false,//是否从标题下规格栏选择
            count: 0,
            showDrawer: false,
            iconList: {
                // home: HOME_ICON,
                // cart: CART_ICON
            },
            mask: true,
            article: "",
            swiperList: [],//轮播
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
            hasLogin: 0, //是否登录   0未登录  1 登录
            productAd: null, //轮播下广告
            isSellOut: false,//商品是否 售罄
            shareUrl: '',//分享链接
            activityGrouponId: '',//是否参与他人拼团
            cardStatus: '',//当前用户的储值卡状态
            cardProductUrl: '',//储值卡商品的链接
            fullReduces: null,//满减满件信息 
            cartCount: 0,//购物车商品数量
            isCartCountChange: false,//购物车数量是否变化
            isAddLoading: false,//加入购物车或直接购买loading
            shareGuideImg: {
                normal: require('../../assets/images/product/share_guide.png'),
                bargain: require('../../assets/images/product/share_bargain.png'),
                groupon: require('../../assets/images/product/share_groupon.png')
            },
            showMoveDot: [],
            elLeft: 0,
            elTop: 0,
            showImagePreview: false,
            imagePreviewList: [],
            imagePreviewIndex: 0,

        }
    },
    components: {
        "v-evaluate": () => import("@/components/product/CommentList.vue"),
        inputNumber,
        // "v-drawer": drawer,
        "v-head": header,
        "v-package": () => import("./Package.vue"),
        "van-goods-action": GoodsAction,
        "van-goods-action-icon": GoodsActionIcon,
        "van-goods-action-button": GoodsActionButton,
        "van-stepper": Stepper,
        "v-ttz": () => import("./Ttz.vue"),
        "v-ttzArgeement": () => import("./TtzArgeement.vue"),
        "v-cardDialog": () => import("./Card.vue"),
        "vc-swiper": () => import("@/components/common/swiper.vue")
    },
    watch: {
        //监听路由变化
        $route: {
            handler: "pageInit", //监听触发的方法
            immediate: true
        },
        selectSkuIndex: {
            handler: 'changeSelectSku'
            // immediate: true
        },
    },
    mounted() {
        document.addEventListener('scroll', this.throttle(this.handlerScroll, 3000, 0), true)
    },
    destroy() {
        document.removeEventListener('scroll', this.handlerScroll, true)
    },
    computed: {
        ...mapState('Vincent', {
            shareInfo: state => state.wxShare.info
        }),
        //是否禁止下拉刷新
        isDisabledFresh() {
            //某个弹窗打开就禁用刷新
            let { isHandleSkuFromItem, showCardDialog, showDrawer, showGuideShare, showTtzAgreement, showShare, showSales } = this;
            if (isHandleSkuFromItem || showCardDialog || showDrawer || showGuideShare || showTtzAgreement || showShare || showSales) return true
            return false
        },
        //商品详情搜索对应的视频标签
        videoList() {
            return this.article.match(
                /https:\/\/video.gaindewo.com(([\s\S])*?).mp4/g
            );
        },
        /**
         * @description: 获取当前是否是多规格设置了限购数量或者已购数量已经超出了
         * @return {Boolean}
         * @Date: 2019-12-11 17:15:14
         */
        isLimitFull() {
            let { countBuy, limitAmount, buyNumber, promotion } = this;
            var amount = buyNumber;
            //判断限购活动商品是否已超出限购数量
            if (promotion && promotion.type == "LIMITBUY" && amount + countBuy > promotion.limitBuyAmount) {
                this.$toast('您所选规格数量已超出限购数量，不可购买！')
                return false;
            }
            if (typeof countBuy !== 'undefined' && typeof limitAmount !== 'undefined' && limitAmount !== 0) {
                if (parseInt(amount) + parseInt(countBuy) > Number(limitAmount)) {
                    this.$toast('您所选规格数量已超出限购数量，不可购买！')
                    return false;
                }
            }
            return true;
        },
        /**
         * @description: 团团赚包裹补贴 分享弹窗展示对应等级的包裹补贴信息 
         * @return {Array}
         * @Date: 2019-12-11 17:07:20
         */
        productPackageRebates() {
            let { isAnyTtzVip, ttzVipLevel, product } = this;
            let { productPackageRebates } = product;
            if (isAnyTtzVip && ttzVipLevel)
                return productPackageRebates.filter(item => item.vipType == ttzVipLevel);
            return [];
        },
        /**
         * @description: 
         * @LastEditTime: 
         * @return {Object,null}
         * @LastEditors: vincent_Huanghd@126.com
         * @Date: 2019-12-11 17:07:56
         */
        promotionVo() {
            let { promotion, product } = this;
            if (promotion) {
                let map = {
                    GROUPON: "grouponVO",
                    BARGAIN: "bargainVO",
                    FLASHSALE: "flashsaleVO",
                    LIMITBUY: "limitBuyVO",
                    PRESELL: "presellVO"
                };
                return product[map[promotion['type']]]
            }
            return null
        },
        /**
         * @description: 活动商品标识
         * @LastEditTime: Do not Edit
         * @return {String}
         * @LastEditors: vincent_Huanghd@126.com
         * @Date: 2019-12-11 17:12:57
         */
        promotionTitle() {
            let { promotion } = this
            let type = promotion && promotion.type || ''
            let map = {
                GROUPON: "火拼团购",
                BARGAIN: "疯狂砍价",
                FLASHSALE: "限时秒杀",
                LIMITBUY: "限量抢购",
                PRESELL: "定金预售"
            };
            return map[type] || "";
        },
        /**
         * @description: 活动商品描述  团团赚分享赚取补贴
         * @return {String}
         * @LastEditors: vincent_Huanghd@126.com
         * @Date: 2019-12-11 17:14:15
         */
        promotionDes() {
            let { promotion, product } = this
            let type = promotion && promotion.type || ''
            let map = {
                GROUPON: type == "GROUPON" ? `惊喜${product.grouponVO.numbers}人团` : '',
                BARGAIN: "活动时间内低价抢购",
                FLASHSALE: "活动时间内低价抢购",
                LIMITBUY: "限量抢购",
                PRESELL: promotion.presellDes
            };
            return map[type] || "";
        }

    },
    methods: {
        ...mapMutations("Vincent/wxShare", ["resetShareInfo"]),
        async login() {
            let res = await GetUserInfo({ loginName: 17625580369, password: '123456' })
            if (res.errorCode == 200) {
                this.hasLogin = 1
            }
            this.fresh()
        },
        //执行函数 等待时间 
        throttle(func, wait, mustRun) {
            var timeout,
                startTime = new Date();

            return function () {
                var context = this,
                    args = arguments,
                    curTime = new Date();

                clearTimeout(timeout);
                // 如果达到了规定的触发时间间隔，触发 handler
                if (curTime - startTime >= mustRun) {
                    func.apply(context, args);
                    startTime = curTime;
                    // 没达到触发间隔，重新设定定时器
                } else {
                    timeout = setTimeout(func, wait);
                }
            };
        },
        //监听滚动
        handlerScroll(e) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                this.headerActive = false
            }
            else {
                this.headerActive = true
            }
        },
        //获取砍价邀请好友链接
        async inviteBargainShareUrl() {
            let { product } = this;
            let res = await getBarainShareUrl({ id: product.bargainVO.id })
            if (res.errorCode == 200) {
                let data = res.data;
                let { productId, promotionId, currentSellerShopId, currentSellerId } = data;
                let bargainDetailId = data.id;
                var shareUrl = location.origin + "/p/promotion/share/" + productId
                    + "?promotionId=" + promotionId + "&activityId="
                    + bargainDetailId + "&currentSellerShopId=" + currentSellerShopId + "&currentSellerId=" + currentSellerId;
                this.shareUrl = shareUrl

                //重置分享信息  title: product.name, imgUrl: product.imgUrl, 
                this.resetShareInfo({ link: shareUrl });

                //邀请好友 
                if (this.$isFromApp) {
                    let { shareInfo } = this
                    try {
                        shareWechat(shareInfo.title, shareUrl, shareInfo.imgUrl);
                    } catch (e) {
                    }
                    try {
                        window.purchase.shareWechat(shareInfo.title, shareUrl, shareInfo.imgUrl)
                    } catch (e) {
                    }
                }
                else {
                    this.showShare = true;
                }
            }
        },
        //刷新
        onRefresh() {
            // this.fresh()
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.count++;
            }, 500);
        },
        //关闭弹窗
        closeDrawer() {
            this.showDrawer = !this.showDrawer;
        },
        //展示评论
        showAllEvaluate() {
            var productId = this.product.id
            if (!this.hasLogin) {
                var goUrl = window.location.href;
                window.location.href = '/multiPlatLogin/toMultiPlatLogin?fromUrl=' + encodeURIComponent(goUrl);
                return;
            }

            window.location.href = '/shop#/evaluateDetail?productId=' + productId;
        },
        //跳转新商品详情页
        goNewPage(id) {
            this.$router.push({
                name: 'productDetail',
                query: { id: id }
            })
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
                this.$toast('您所选规格数量已超出最高起订量' + max + '件')
                return false;
            }
            else if (min && min != 0 && buyNumber < min) {
                this.$toast('您所选规格数量少于最低起订量' + min + '件')
                return false;
            }
            return true;
        },
        //跳转购物车
        jumpCart() {
            let { hasLogin } = this;
            if (hasLogin) {
                if (this.$isFromApp) {
                    try { window.goCart(); } catch (e) { }
                    try { window.purchase.goCart() } catch (e) { }
                } else {
                    window.location.href = "/shop#/car";
                }
            }
            else {
                //未登录提示
                this.$goLogin()
            }
        },
        //监听选中sku变化
        changeSelectSku(nVal = 0) {
            let { skusList, product } = this;
            let sku = skusList[nVal];
            //设置当前sku的限购信息
            var countBuy = sku.countBuy || 0;
            var limitAmount = sku.limitAmount || 0;
            var pro_countBuy = product.countBuy;
            var pro_limitAmount = product.limitAmount;
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
            this.limitAmount = limitNumber;
        },
        //显示提示用户无法继续购买储值卡提醒
        showCardConfirm() {
            let { cardStatus } = this;
            let txt = cardStatus == 'REFUNDING' ? '抱歉，由于您当前的储值卡正在退卡中，暂时不能购买储值卡哦！如有需求可去我的储值卡-退卡功能内取消退卡。' : '抱歉，您当前的卡正常使用中，暂不可购买，如有需求可去我的储值卡内充值或升级您的储值卡。'
            this.$dialog.confirm({
                message: txt,
                width: '270px',
                messageAlign: 'left',
                className: 'vc-vant-confirm-modal',
                confirmButtonText: cardStatus == 'NORMAL' ? '升级或充值' : '知道了',
                showCancelButton: cardStatus == 'NORMAL',
            }).then(() => {
                //正常状态跳转到储值卡首页
                if (cardStatus == 'NORMAL') {
                    window.location.href = '/card/index'
                }
                // on confirm
            }).catch(() => {
                // on cancel
            });
        },
        //加入购物车
        addCart() {
            let { promotion } = this;
            if (!this.beforeChooseSku()) return;
            //判断当前商品是否是砍价/团购  不可加入购物车
            if (promotion && (promotion.type == 'GROUPON' || promotion.type == 'BARGAIN')) {
                this.$toast('该活动商品暂不支持加入购物车!')
                return false;
            }
            this.orderType = 1;
            this.showDrawer = true;
        },
        //想买  isBuyForMarketPrice 是否原价购买 默认false
        wantBuy({ isBuyForMarketPrice = false } = {}) {
            let { promotion } = this;
            if (!this.beforeChooseSku()) return;
            this.orderType = 0;
            //如果是拼团或者砍价 只能是单规格且数量不可改动 直接下单
            if (promotion && (promotion.type == 'GROUPON' || promotion.type == 'BARGAIN')) {
                this.addProduct({ isBuyForMarketPrice: isBuyForMarketPrice });
            }
            else {
                this.showDrawer = true;
            }
        },
        //sku选择弹窗中直接加入购物车或者购买
        submitSkuPopup(orderType) {
            //判断是否需要展示销售协议
            if (this.showSalesSwitch) {
                this.showSales = true;
                return;
            }
            if (!this.isAnyTtzVip && this.product.ttzFlag) {
                this.showTtzAgreement = true;
                return;
            }
            this.orderType = orderType;
            this.addProduct();
        },
        //展示sku选择框  
        showSkuPopup() {
            //如果是拼团  砍价  只能是单规格不能选择规格 数量
            let { promotion } = this;
            if (promotion && (promotion.type == 'GROUPON' || promotion.type == 'BARGAIN')) return;
            if (!this.beforeChooseSku()) return;
            this.isHandleSkuFromItem = true;
            this.showDrawer = true;
        },
        //弹窗sku选择之前前置判断
        beforeChooseSku() {
            //当前商品是储值卡商品 并且卡状态为退卡中或者正常
            if (this.cardStatus == 'REFUNDING' || this.cardStatus == 'NORMAL') {
                this.showCardConfirm()
                return false;
            }
            //判断是否需要展示销售协议
            if (this.showSalesSwitch) {
                this.showSales = true;
                return false;
            }
            if (!this.isAnyTtzVip && this.product.ttzFlag) {
                this.showTtzAgreement = true;
                return false;
            }

            return true;
        },
        /**
         * @description: 展示储值卡对应的sku优惠明明细
         * @param {type} 
         * @return: 
         * @Date: 2019-12-11 18:22:15
         */
        async showSkuDeposit() {
            let { cardProductUrl } = this;
            if (!cardProductUrl) {
                let res = await getCardProductUrl();
                if (res.errorCode == 200) {
                    this.cardProductUrl = res.data;
                }
            }
            this.showCardDialog = true;

        },
        //预览sku图片
        previewImage() {
            let { skusList } = this;
            let data = [];
            skusList.map(item => {
                data.push(item.imgUrl);
            });
            this.imagePreviewList = data
            this.showImagePreview = true;
        },
        //预览图切换 
        changePreviewImage(index) {
            this.imagePreviewIndex = index;
        },
        //改变购买数量
        setNumber(val) {
            let { skusList, selectSkuIndex } = this;
            if (val >= skusList[selectSkuIndex]['amount']) {
                this.buyNumber = skusList[selectSkuIndex]['amount'];
            }
        },
        //选择规则 切换变化  库存不能为0
        selectSku(skuIndex, amount) {
            if (amount) {
                this.selectSkuIndex = skuIndex;
                this.buyNumber = 1;
            }
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
        //isBuyForMarketPrice  是否原价购买 true为原价购买
        async addProduct({ isBuyForMarketPrice = false } = {}) {

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
            let { shopId, activityGrouponId, promotion, promotionVo } = this;
            //加入购物车
            if (this.orderType) {
                let data = {
                    skuId: skuId,
                    productId: productId,
                    amount: qty,
                    shopOwnerId: shopId,
                    type: "addCart"
                };
                // 如果是限购 加上活动id
                if (promotion && promotion.type != 'FLASHSALE' && promotion.hasOwnProperty('id') && !isBuyForMarketPrice) {
                    data["promotionId"] = promotion.id;
                }
                //该商品为复合商品规格，需要选择对应sku
                if (isBasicPro == 1) {
                    //混批
                    if (mixBatch == 1) {
                        window.location.href = '/shop?route=productMixBatch&params=' + JSON.stringify(data)
                        //不混批
                    } else {
                        window.location.href = "/shop?route=productPackage&params=" + JSON.stringify(data);
                    }
                } else {
                    this.isAddLoading = true;
                    let response = await addCart(data);
                    if (response.errorCode == 200) {
                        this.showDrawer = false;
                        //加入购物车动画
                        this.showMoveDot = [...this.showMoveDot, true];
                        if (this.cartCount < response.data) {
                            this.isCartCountChange = true;
                        }
                        this.$toast("加入购物车成功！");
                    } else {
                        this.$toast(response.moreInfo);
                    }
                    this.isAddLoading = false;
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
                    if (promotion && promotion.type != 'FLASHSALE' && promotion.hasOwnProperty('id') && !isBuyForMarketPrice) {
                        data["promotionId"] = promotion.id;
                    }
                    //路由携带该参数则为参加拼团活动
                    if (activityGrouponId) {
                        data['activityGrouponId'] = activityGrouponId
                    }
                    //如果当前是砍价商品 携带当前砍价detailId 获取最优惠价格
                    if (promotion && promotion.type == "BARGAIN") {
                        data['activityGrouponId'] = promotionVo.detailId
                    }
                    //混批
                    if (mixBatch == 1) {
                        window.location.href = '/shop?route=productMixBatch&params=' + JSON.stringify(data)
                        //不混批
                    } else {

                        window.location.href = "/shop?route=productPackage&params=" + JSON.stringify(data);
                    }
                } else {
                    let params = `skuId=${skuId}&shopId=${shopId}&qty=${qty}&productId=${productId}`;
                    // 如果时限购 加上活动id
                    if (promotion && promotion.type != 'FLASHSALE' && promotion.hasOwnProperty('id') && !isBuyForMarketPrice) {
                        params += `&promotionId=${promotion.id}`;
                    }
                    //路由携带该参数则为参加拼团活动
                    if (activityGrouponId) {
                        params += `&activityGrouponId=${activityGrouponId}`;
                    }
                    //如果当前是砍价商品 携带当前砍价detailId 获取最优惠价格
                    if (promotion && promotion.type == "BARGAIN") {
                        params += `&activityGrouponId=${promotionVo.detailId}`;
                    }
                    window.location.href = '/cart/next?' + params
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
                this.isCollection = !isCollection;
            }
        },
        //复制链接
        copyUrl() {
            var Url2 = this.shareUrl;
            var oInput = document.createElement('input');
            oInput.value = Url2;
            oInput.readOnly = ''//只读
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display = 'none';
            this.$toast('复制链接成功')
        },
        //获取完商品数据后的初始化
        init(response) {
            this.isIniting = false;
            this.commentsRecords = [];
            let _this = this;
            this.product = { ...response.data.product };
            this.swiperList = this.product.imgs.map(item => {
                return {
                    imgUrl: item.imgUrl,
                    targetUrl: '',
                    videoUrl: item.videoUrl
                }
            })
            console.log(sessionStorage.getItem('cartCount'), 'cartCount')
            if (sessionStorage.getItem('cartCount')) {
                this.cartCount = sessionStorage.getItem('cartCount');
                sessionStorage.removeItem('cartCount')
            }
            else {
                this.cartCount = response.data.cartCount;
            }
            this.isCollection = response.data.isCollection;
            this.ttzPromotion = response.data.ttzPromotion || null;
            this.article = this.product.fullText;
            this.isTwitter = response.data.isTwitter; //是否代理
            this.hasLogin = response.data.login || 0;//是否登录
            this.cardStatus = response.data.cardStatus;//当前用户储值卡状态
            this["shopId"] = response.data.shop.ownerId;
            this.skusList = this.product.skus.map(item => {
                item["spec"] = item["spec"].split(",").join("+");
                return item;
            });
            this.changeSelectSku();
            this.shareUrl = response.data.shareUrl;
            //重置分享信息
            this.resetShareInfo({ title: this.product.name, imgUrl: this.product.imgUrl, link: response.data.shareUrl })
            //轮播下广告图
            this.productAd = response.data.productAd;
            this.isSellOut = response.data.sellout;
            this.showSalesSwitch = !response.data.productSalesAgreement && response.data.productSalesAgreementSwitch;
            if (this.showSalesSwitch) {
                //查询销售协议内容
                this.querySalesAgreement();
            }
            //团团转商品判断
            if (response.data.product.ttzFlag && response.data.login == 1) {
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
                this.promotion["presellDes"] = this.product.presellVO.presellDescription;
                this.promotion["resetStart"] = this.product.presellVO.restStartAt;
                this.promotion["resetEnd"] = this.product.presellVO.restEndAt;
            } else {
                //限购活动 追加限购数量
                if (response.data.promotion.type == 'LIMITBUY') {
                    response.data.promotion.limitBuyAmount = response.data.limitBuyAmount;
                }

                this.promotion = response.data.promotion;

            }
            //评论
            let commentsRecords = [...response.data.commentsRecords];
            commentsRecords.map((item, key) => {
                item["createdAt"] = item["createdAt"];
                item["buyerName"] = item["buyerName"];
                item["star"] = Number(item["star"]);
                _this.commentsRecords.push(item);
            });
            //满减满件
            if (response.data.hasOwnProperty("fullReduces")) {
                this.fullReduces = response.data.fullReduces;
            }
            if (response.data.hasOwnProperty("currentSellerShopId")) {
                this.currentSellerShopId = response.data.currentSellerShopId;
            }
            if (response.data.hasOwnProperty("currentSellerId")) {
                this.currentSellerId = response.data.currentSellerId;
            }


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
            else {
                if (this.hasLogin) {
                    this.showTtzAgreement = true
                }
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
            else {
            }
        },
        //初始化商品数据
        initProduct(params) {
            this.isIniting = true;
            // const response = await getProduct(params.id, params);
            getProduct(params.id || '', params).then(response => {
                if (response.errorCode == 200) {
                    this.init(response);
                } else if (response.errorCode == 302) {
                    let url = response.moreInfo;
                    this.redirectInit(url);
                } else {
                    let { path, query, name } = this.$route;
                    let route = {
                        path: path,
                        query: query,
                        name: name
                    }
                    this.$router.replace({
                        path: '/error',
                        query: {
                            route: encodeURIComponent(JSON.stringify(route))
                        }
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //获取推荐商品
        getRecommend(id) {
            getRecommend({ productId: id }).then(response => {
                if (response.errorCode == 200 && response.data.length) {
                    this.recommendList = [...response.data];
                }
            })
        },
        //
        getCollocation(id) {
            getCollocation({ productId: id }).then(response => {
                if (response.errorCode == 200 && response.data.length) {
                    this.collocationList = [...response.data];
                }
            })
        },
        //跳转首页
        jumpHome() {
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
        //跳转套餐搭配
        goPackage(id) {
            let { hasLogin, isTwitter } = this;
            var data = {
                isLogin: hasLogin,
                isTwitter: isTwitter,
                id: id
            }
            window.location.href = "/shop?route=packagePro&params=" + JSON.stringify(data);
        },
        //
        // addToCart() {
        //     // 增加到购物车触发事件完成动画的触发
        //     this.elLeft = event.target.getBoundingClientRect().left;
        //     this.elTop = event.target.getBoundingClientRect().top;
        //     this.showMoveDot = [...this.showMoveDot, true];
        // },
        //设置动画开始点
        beforeEnter(el) {
            // 设置transform值  触发按钮的动画起点  相对触发按钮的偏移量
            // el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop + 300}px , 0)`;
            //设置起点为页面相对居中区域
            el.style.transform = `translate3d(40vw,50vh,0)`;

            // 设置透明度
            el.style.opacity = 0;
        },
        //设置结束点
        afterEnter(el) {
            // 获取底部购物车徽标的位置
            const badgePosition = document
                .getElementById("buycar")
                .getBoundingClientRect();
            // 设置位移
            el.style.transform = `translate3d(${badgePosition.left - 30}px,${badgePosition.top - 30}px,0)`
            // 增加贝塞尔曲线  
            // el.style.transition = 'transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
            el.style.transition = 'transform 0.88s cubic-bezier(0.2, -0.45, 1, -0.15)';

            // el.style.transition = 'transform .88s linear';
            this.showMoveDot = this.showMoveDot.map(item => false);
            // 设置透明度
            el.style.opacity = 1;
            // 监听小球动画结束方法
            el.addEventListener('transitionend', () => {
                el.style.display = 'none';
                this.listenInCart();
            })
            el.addEventListener('webkitAnimationEnd', () => {
                el.style.display = 'none';
                this.listenInCart();
            })
        },
        //监听动画结束
        listenInCart() {
            let { isCartCountChange } = this;
            if (isCartCountChange) {
                this.cartCount = this.cartCount + 1;
                this.isCartCountChange = false;
            }
            // 拿到购物车的DOM添加class
            document.getElementById("buycar").classList.add('moveToCart');
            setTimeout(() => {
                // 500毫秒后移除class
                document.getElementById("buycar").classList.remove('moveToCart');
            }, 500);
        },
        //刷新执行的初始化函数
        fresh() {
            let id = this.$route.query.id;
            let activityGrouponId = this.$route.query.activityGrouponId
            this.activityGrouponId = (activityGrouponId && activityGrouponId != 'undefined' && activityGrouponId != 'null') ? this.$route.query.activityGrouponId : ''
            this.initProduct({ id: id });
            this.getRecommend(id);
            this.getCollocation(id);
        },
        pageInit() {
            if (this.$env == 'development') {
                this.login()
            }
            else {
                this.fresh();
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
        },
        //el 标签  speed 滚动速率 此处是50px 值越大滚动的越快
        goAssignBlock(headerTabVal, speed = 50) {
            this.headerTabVal = headerTabVal;
            this.$nextTick(() => {
                let h = this.$refs[headerTabVal].offsetHeight; //模块内容高度
                let t = this.$refs[headerTabVal].offsetTop; //模块相对于内容顶部的距离
                function step() {
                    window.scrollTo(0, t - 40);
                    // requestId = window.requestAnimationFrame(step);
                }
                window.requestAnimationFrame(step);
            })
        }
    },
    created() {
        this.setShareInfo()
    }
}