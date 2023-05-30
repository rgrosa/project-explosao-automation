import { APIRequestContext, APIResponse } from '@playwright/test';

export class ExplosaoService {

readonly request: APIRequestContext;
env;

    constructor(envData: any, request: APIRequestContext){
        this.env = envData;
        this.request = request;
    }

    async getToken(){

        console.log(`Get entitled fields for user - multilanguage`);
        const response = await this.request.post(this.env.EXPLOSAO_URL+"/login", {
          data: {  	userName :"admin",
                    password:"1admin_explosao1" }
        });
        return response;
    }
}3