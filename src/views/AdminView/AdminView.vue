<template>
	<div class="admin-container">
		<div class="admin-header">
			<router-link to="/admin/currencies"
				:class="{ active: $route.path === '/admin/currencies' }">Валюты</router-link>
			<router-link to="/admin/exchange" :class="{ active: $route.path === '/admin/exchange' }">Курсы
				валют</router-link>
		</div>
		<router-view></router-view>
	</div>
	<div class="admin-header converter-header">
		<router-link to="/">Конвертер</router-link>
	</div>
</template>

<script>
export default {
	name: 'AdminView'
};
</script>

<style scoped>
.converter-header {
	position: absolute;
	top: 20px;
	right: 20px;
}

.admin-header {
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
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

.admin-header a.active {
	background-color: #3399ff;
	color: #fff;
}
</style>