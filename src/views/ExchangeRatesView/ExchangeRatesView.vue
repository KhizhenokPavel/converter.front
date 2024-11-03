<script setup lang="ts">
import { ref, onMounted } from 'vue';
import exchangeService from '@/apiServices/exchange.service';

interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

const exchangeRates = ref<ExchangeRate[]>([]);
const message = ref<string | null>(null);

const getExchangeRates = async () => {
  try {
    const response = await exchangeService.getExchangeRates();
    const rates = response.data;
    const resultRates: ExchangeRate[] = [];

    Object.keys(rates).forEach(fromCurrency => {
      Object.keys(rates[fromCurrency]).forEach(toCurrency => {
        resultRates.push({
          fromCurrency: fromCurrency,
          toCurrency: toCurrency,
          rate: rates[fromCurrency][toCurrency]
        });
      });
    });

    exchangeRates.value = resultRates;
  } catch (error) {
    message.value = 'Ошибка получения курсов';
  }
};

onMounted(() => {
  getExchangeRates();
});
</script>

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
        <tr v-for="rate in exchangeRates" :key="rate.fromCurrency">
          <td>{{ rate.fromCurrency }}</td>
          <td>{{ rate.toCurrency }}</td>
          <td>{{ rate.rate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>