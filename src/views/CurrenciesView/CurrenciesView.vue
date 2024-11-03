<script setup lang="ts">
import { ref, onMounted } from 'vue';
import currenciesService from '@/apiServices/currencies.service';

const currencies = ref<string[]>([]);
const newCurrency = ref<string>('');
const message = ref<string>('');

const getAvailableCurrencies = async () => {
    try {
        const response = await currenciesService.getAvailableCurrencies();
        currencies.value = response.data;
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

const addCurrency = async () => {
    if (newCurrency.value && !currencies.value.includes(newCurrency.value)) {
        try {
            const response = await currenciesService.addAvailableCurrency(newCurrency.value);
            message.value = response.data;
            currencies.value.push(newCurrency.value);
            newCurrency.value = '';
        } catch (error) {
            message.value = 'Ошибка добавления валюты';
        }
    } else {
        message.value = 'Ошибка добавления валюты';
    }
};

const deleteCurrency = async (currency: string) => {
    try {
        const response = await currenciesService.removeAvailableCurrency(currency);
        message.value = response.data;
        currencies.value = currencies.value.filter((cur) => cur !== currency);
    } catch (error) {
        message.value = 'Ошибка удаления валюты';
    }
};

onMounted(() => {
    getAvailableCurrencies();
});
</script>

<template>
    <div>
        <h2>Валюты</h2>
        <input type="text" v-model="newCurrency" placeholder="Введите название валюты">
        <div class="message-block">{{ message }}</div>
        <button @click="addCurrency">Добавить валюту</button>
        <table>
            <thead>
                <tr>
                    <th>Валюта</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="currency in currencies" :key="currency">
                    <td>{{ currency }}</td>
                    <td><button @click="deleteCurrency(currency)">Удалить</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.message-block {
    min-height: 30px;
}
</style>