import Axios from 'axios';

const RESOURCE_NAME = '/converter';

export default {
    convert(amount: number, from: string, to: string) {
        return Axios.get(RESOURCE_NAME + '/convert', {params: {
            amount: amount,
            from: from,
            to: to,
        }});
    },
};