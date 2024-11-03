import Axios from 'axios';

const RESOURCE_NAME = '/currency';

export default {
    getAvailableCurrencies() {
        return Axios.get(RESOURCE_NAME + '/getAvailableCurrencies');
    },
    addAvailableCurrency(code: string) {
        return Axios.post(RESOURCE_NAME + '/addAvailableCurrency', { 'code': code });
    },
    removeAvailableCurrency(code: string) {
        return Axios.delete(RESOURCE_NAME + '/removeAvailableCurrency', { params: {'code': code }});
    },
};