import Vue from 'vue'
import Router from 'vue-router'
import FrontPage from '@/components/FrontPage'
import Block from '@/components/Block'
import Transaction from '@/components/Transaction'
import Address from '@/components/Address'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router);

export default new Router({
  history: true,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FrontPage',
      component: FrontPage
    },
    {
      path: '/block/:id',
      name: 'Block',
      component: Block
    },
    {
      path: '/transaction/:id',
      name: 'Transaction',
      component: Transaction
    },
    {
      path: '/address/:address',
      name: 'Address',
      component: Address
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
});
