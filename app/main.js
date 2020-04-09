import Vue from 'nativescript-vue'
import RadListView from "nativescript-ui-listview/vue";
import LoginPage from "./components/LoginPage";

Vue.use(RadListView);
new Vue({
    render: function (h) {
        return h('Frame', [h(LoginPage)]);
    }
}).$start();
