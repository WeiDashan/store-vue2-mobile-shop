const appUser = '/app-user';
const appOrder = '/app-order';
const appCart = '/app-cart';
const secKill = '/sec-kill';
const spuValue = '/pms-spu-value';
export const AppUserUrl= {
    checkCodeByEmail: appUser+"/checkCodeByEmail",
    getCodeByEmail: appUser+'/getCodeByEmail',
    registerAppUser: appUser+'/registerAppUser',
    loginByPassword: appUser+'/loginByPassword',
    getCodeByEmailToLogin: appUser+'/getCodeByEmailToLogin',
    loginByCode: appUser+"/loginByCode",
}
export const AppOrderUrl= {
    sendOrderToMQ: appOrder+"/sendOrderToMQ",
    createOrder: appOrder+"/createOrder",
    getAllOrdersByUserId: appOrder+"/getAllOrdersByUserId",
    getAllOrdersByUserIdAndStatus: appOrder+"/getAllOrdersByUserIdAndStatus",
}
export const AppCartUrl= {
    getAllCartByUserId: appCart+"/getAllCartByUserId",
    addCart: appCart+"/addCart",
    updateProductNumByCartId: appCart+"/updateProductNumByCartId",
}
export const SecKillUrl={
    getSecKillDetail: secKill+"/getSecKillDetail",
    secKillNow: secKill+"/secKillNow",
}
export const SpuValueUrl={
    getSpuValuesByProductId: spuValue+"/getSpuValuesByProductId",
}