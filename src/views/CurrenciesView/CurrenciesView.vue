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

<script>
import currenciesService from '@/apiServices/currencies.service';

export default {
    data() {
        return {
            currencies: [],
            newCurrency: '',
            message: ''
        };
    },
    created() {
        this.getAvailableCurrencies();
    },
    methods: {
        async getAvailableCurrencies() {
            currenciesService.getAvailableCurrencies().then((response) => {
                this.currencies = response.data;
                this.fromCurrency = this.currencies[0];
                this.toCurrency = this.currencies[1];
            }).catch((error) => {
                console.error('Ошибка:', error);
            });
        },
        async addCurrency() {
            if (this.newCurrency && !this.currencies.includes(this.newCurrency)) {
                currenciesService.addAvailableCurrency(this.newCurrency).then((response) => {
                    this.message = response.data;
                    this.currencies.push(this.newCurrency);
                }).catch((error) => {
                    this.message = 'Ошибка добавления валюты';
                });
            } else {
                this.message = 'Ошибка добавления валюты';
            }
        },
        deleteCurrency(currency) {
            currenciesService.removeAvailableCurrency(currency).then((response) => {
                this.message = response.data;
                this.currencies.pop(currency);
            }).catch((error) => {
                this.message = 'Ошибка удаления валюты';
            });
        }
    }
};
</script>

<style scoped>
.message-block {
    min-height: 30px;
}
</style>