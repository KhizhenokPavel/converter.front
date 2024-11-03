<template>
  <div>
    <h2>Курсы валют</h2>
    <table>
      <thead>
        <tr>
          <th>Из валюты</th>
          <th>В валюту</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rate in exchangeRates" :key="fromCurrency">
          <td>{{ rate.fromCurrency }}</td>
          <td>{{ rate.toCurrency }}</td>
          <td>{{ rate.rate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import exchangeService from '@/apiServices/exchange.service';

export default {
  data() {
    return {
      exchangeRates: []
    };
  },
  created() {
    this.getExchangeRates();
  },
  methods: {
    async getExchangeRates() {
      exchangeService.getExchangeRates().then((response) => {
        let rates = response.data;
        let resultRates = [];

        Object.keys(rates).forEach(function (fromCurrency) {
          Object.keys(rates[fromCurrency]).forEach(function (toCurrency) {
            resultRates.push({
              fromCurrency: fromCurrency,
              toCurrency: toCurrency,
              rate: rates[fromCurrency][toCurrency]
            });
          });
        });

        this.exchangeRates = resultRates;
      }).catch(() => {
        this.message = 'Ошибка получения курсов';
      });
    }
  }
};
</script>

<style scoped></style>