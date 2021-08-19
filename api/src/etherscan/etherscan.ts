
import { HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
class Etherscan {

    apiKey: string;
    apiUrl: string;
    constructor(key, url) {
        this.apiKey = key;
        this.apiUrl = url;
    }
    public async getBalance(address: string) {
        return await axios.get(`${this.apiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${this.apiKey}`)
            .then(resp => {
                if (resp.data.status == 1) {
                    console.log(`Balance >>>>>>>>>>>>>>>>>>>>>>>>>> ${resp.data.result}`);
                    return resp.data.result;
                } else {
                    console.log(`Balance >>>>>>>>>>>>>>>>>>>>>>>>>> ${resp.data.result}`);
                    throw new HttpException(resp.data.result, HttpStatus.BAD_REQUEST);
                }
            })
            .catch(error => {
                console.log(error);
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            });
    }

    public async firstTransactionTS(address: string) {
        return await axios.get(`${this.apiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${this.apiKey}`)
            .then(resp => {
                if (resp.data.status == 1) {
                    console.log(resp.data)
                    return resp.data.result[0].timeStamp;
                } else {
                    return Date.now();
                }
            })
            .catch(error => {
                //throw exception
                console.log(error);
                return Date.now();
            });
    }
}

export { Etherscan };