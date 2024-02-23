const appUser = '/app-user';
const appOrder = '/app-order';

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