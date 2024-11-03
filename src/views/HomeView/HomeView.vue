<script setup lang="ts">
import converterService from '@/apiServices/converter.service';
import currenciesService from '@/apiServices/currencies.service';
import { ref, onMounted } from 'vue';

const currencies = ref([]);
const fromCurrency = ref('');
const toCurrency = ref('');
const amount = ref(0);
const result = ref('');

const getAvailableCurrencies = async () => {
    try {
        const response = await currenciesService.getAvailableCurrencies();
        currencies.value = response.data;
        fromCurrency.value = currencies.value[0];
        toCurrency.value = currencies.value[1];
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

const convert = async () => {
    try {
        const response = await converterService.convert(amount.value, fromCurrency.value, toCurrency.value);
        result.value = response.data;
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

onMounted(() => {
    getAvailableCurrencies();
});
</script>


<template>
    <div class="container">
        <h1>Currency Converter</h1>
        <div class="converter">
            <select v-model="fromCurrency">
                <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
            </select>
            <select v-model="toCurrency">
                <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
            </select>
            <input type="number" v-model="amount" placeholder="Enter amount">
            <button @click="convert">Конвертировавть</button>
            <div id="result">{{ result }}</div>
        </div>
    </div>
    <div class="admin-header">
        <router-link to="/admin/exchange">Админка</router-link>
    </div>
</template>

<style scoped>
.admin-header {
    position: absolute;
    top: 20px;
    right: 20px;
}

.admin-header a {
    margin: 0;
    padding: 10px 20px;
    border: 1px solid #007bff;
    border-right: none;
    border-radius: 4px 0 0 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
}

.admin-header a:last-child {
    border-right: 1px solid #007bff;
    border-radius: 0 4px 4px 0;
}

.admin-header a:hover {
    background-color: #0056b3;
}

.container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h1 {
    margin-bottom: 20px;
}

.converter {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

select,
input,
button {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

input {
    max-width: 150px;
    margin: 0 auto;
}

button {
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

#result {
    margin-top: 20px;
    font-size: 18px;
}
</style>