import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/vant.js'
import { Tab, Tabs } from 'vant';
import { Search } from 'vant';
import { Dialog } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { AddressList } from 'vant';
import { AddressEdit } from 'vant';
import { DatetimePicker } from 'vant';
import { Picker } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { TreeSelect } from 'vant';
import { Image as VanImage } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Sku } from 'vant';
import { SubmitBar } from 'vant';
import { PasswordInput, NumberKeyboard } from 'vant';
import { Uploader } from 'vant';
import { Loading } from 'vant';
import { Overlay } from 'vant';
import { Stepper } from 'vant';
import common from "./components/common";

Vue.prototype.common = common;
Vue.use(Stepper);
Vue.use(Overlay);
Vue.use(Loading);
Vue.use(Uploader);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(SubmitBar);
Vue.use(CheckboxGroup);
Vue.use(Sku);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(VanImage);
Vue.use(TreeSelect);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Search);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Dialog);
Vue.config.productionTip = false
Vue.use(Form);
Vue.use(Field);

// Vue.prototype.img = (path) => {
//   return 'http://139.196.126.28:9000/images/' + path
// }
// Vue.prototype.img = (path) => {
//   return 'http://49.233.51.52:9000/images/' + path
// }
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
