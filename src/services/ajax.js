import 'whatwg-fetch';

export const API_URL = 'https://pokeapi.co/api/v2/';

/* Usage 
    const service = {
        endpoint: 'pokemon'
        method: 'POST',
        queryParams: {
            limit: 25
        },
        data: {} //Si fuera necesario
    };

    new AjaxRequest({ service })
    .makeRequest()
    .then(handleResponse)
    .catch(handleError);
*/

export class AjaxRequest {
    constructor({url, service}) {
        this.url = url || API_URL;
        this.headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        };
        this.service = service;
    }

    _buildURL(endpoint, queryParams){
        let url = `${this.url}`;
        const params = queryParams && Object.keys(queryParams);
        
        if(endpoint){
            url += `${endpoint}`;
        }

        if(params && params.length > 0){
            for(let param of params){
                if(!url.includes('?')){
                    url += `?${param}=${queryParams[param]}`;
                } else {
                    url += `&${param}=${queryParams[param]}`;
                }
            }
        }

        return url;
    }

    makeRequest() {
        const service = this.service || {};
        const endpoint = service.endpoint;
        const method = service.method || 'GET';
        const queryParams = service.queryParams;
        const data = service.data;
        const headers = this.headers;
        const url = this._buildURL(endpoint, queryParams);

        const hash ={
            method,
            headers: new Headers(headers),
            cache: 'no-cache'
        };

        if(data){
            hash['body'] = JSON.stringify(data);
        }

        return new Promise((resolve, reject) => {
            fetch(url, hash)
                .then(response => {
                    const status = response.status;
                    if(status === 200) return response.json();
                    if(status <= 400) reject();
                })
                .then(resolve)
                .catch(reject)
        });
    }
}