import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView/HomeView.vue";
import CatalogView from "@/views/AdminView/AdminView.vue";
import CurrenciesView from '@/views/CurrenciesView/CurrenciesView.vue';
import ExchangeRatesView from '@/views/ExchangeRatesView/ExchangeRatesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/admin',
      component: CatalogView,
      children: [
        {
          path: 'currencies',
          name: 'CurrenciesView',
          component: CurrenciesView
        },
        {
          path: 'exchange',
          name: 'ExchangeRatesView',
          component: ExchangeRatesView
        }
      ]
    },
  ]
})

export default router