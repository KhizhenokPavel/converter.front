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

<script>
import converterService from '@/apiServices/converter.service';
import currenciesService from '@/apiServices/currencies.service';

export default {
    data() {
        return {
            currencies: [],
            fromCurrency: '',
            toCurrency: '',
            amount: 0,
            result: ''
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
        async convert() {
            converterService.convert(this.amount, this.fromCurrency, this.toCurrency).then((response) => {
                this.result = response.data;
            }).catch((error) => {
                console.error('Ошибка:', error);
            });
        }
    }
};
</script>

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