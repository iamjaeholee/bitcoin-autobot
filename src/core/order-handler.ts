import apiHandler from './api-handler';
import {Method} from 'axios';
import {uuid} from "uuidv4";
import crypto from 'crypto';
import {sign} from 'jsonwebtoken';
import {encode as queryEncode} from "querystring";
import {accessKey} from '../config/key';
import {secretKey} from '../config/key';


const OrderHandler =  (function () {
	const OrderHandler = function () {
	} as any as {new (): any};

	OrderHandler.prototype.sellAll = async function (){
		// get current balance
		const result = await this.getChance();
		const balance = (Number(result.ask_account.balance));

		// selling
		const sellBody = {
			market: 'KRW-ADA',
			side: 'ask',
			volume: balance,
			price: null,
			ord_type: 'market',
		}

		const sellHash = crypto.createHash('sha512')
		const sellQuery = queryEncode(sellBody)
		const sellQueryHash = sellHash.update(sellQuery, 'utf-8').digest('hex')

		const sellPayload = {
			access_key: accessKey,
			nonce: uuid(),
			query_hash: sellQueryHash,
			query_hash_alg: 'SHA512',
		}

		const sellToken = sign(sellPayload, secretKey);

		const sellConfig = {
			method: 'post' as Method,
			url: 'https://api.upbit.com/v1/orders',
			headers: {Authorization: `Bearer ${sellToken}`},
			data: {...sellBody}
		}

		const sellResult = await apiHandler.getInformation(sellConfig);
		return sellResult;
	};

	OrderHandler.prototype.getChance = async function (){
		const body = {
			market: 'KRW-ADA'
		}

		const query = queryEncode(body)
		const hash = crypto.createHash('sha512')
		const queryHash = hash.update(query, 'utf-8').digest('hex')

		const payload = {
			access_key: accessKey,
			nonce: uuid(),
			query_hash: queryHash,
			query_hash_alg: 'SHA512',
		}

		const token = sign(payload, secretKey)

		const chanceConfig = {
			method: 'get' as Method,
			url: 'https://api.upbit.com/v1/orders/chance?' + query,
			headers: {Authorization: `Bearer ${token}`},
		}

		const result = await apiHandler.getInformation(chanceConfig);
		return result;
	};

	OrderHandler.prototype.buy = async function (amount: number){
		// buying
		const buyBody = {
			market: 'KRW-ADA',
			side: 'bid',
			volume: null,
			price: amount.toString(),
			ord_type: 'price',
		}

		const buyHash = crypto.createHash('sha512')
		const buyQuery = queryEncode(buyBody)
		const buyQueryHash = buyHash.update(buyQuery, 'utf-8').digest('hex')

		const buyPayload = {
			access_key: accessKey,
			nonce: uuid(),
			query_hash: buyQueryHash,
			query_hash_alg: 'SHA512',
		}

		const buyToken = sign(buyPayload, secretKey);

		const buyConfig = {
			method: 'post' as Method,
			url: 'https://api.upbit.com/v1/orders',
			headers: {Authorization: `Bearer ${buyToken}`},
			data: {...buyBody}
		}

		const result = await apiHandler.getInformation(buyConfig);
		return result;
	}

	OrderHandler.prototype.buyQuarter = async function (){
		// buying
		const buyBody = {
			market: 'KRW-ADA',
			side: 'bid',
			volume: null,
			// price: amount.toString(),
			ord_type: 'price',
		}

		const buyHash = crypto.createHash('sha512')
		const buyQuery = queryEncode(buyBody)
		const buyQueryHash = buyHash.update(buyQuery, 'utf-8').digest('hex')

		const buyPayload = {
			access_key: accessKey,
			nonce: uuid(),
			query_hash: buyQueryHash,
			query_hash_alg: 'SHA512',
		}

		const buyToken = sign(buyPayload, secretKey);

		const buyConfig = {
			method: 'post' as Method,
			url: 'https://api.upbit.com/v1/orders',
			headers: {Authorization: `Bearer ${buyToken}`},
			data: {...buyBody}
		}

		const result = await apiHandler.getInformation(buyConfig);
		return result;
	}

	return OrderHandler;
} ()) ;

export default new OrderHandler();