import { ENDPOINT_API } from "../utils/config";

const axios = require('axios');

export const getData = (sunValue: string, waterValue: string, petValue: string) => {
    return axios.get(`${ENDPOINT_API}?sun=${sunValue}&water=${waterValue}&pets=${petValue}`);
}