import Axios from 'axios';

const RESOURCE_NAME = '/exchange';

export default {
    getExchangeRates() {
        return Axios.get(RESOURCE_NAME + '/getExchangeRates');
    },
};