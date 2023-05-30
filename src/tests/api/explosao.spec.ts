
import { expect, test, APIResponse } from '@playwright/test';
import { ExplosaoService } from '../../services/explosaoService';
require('dotenv').config()

let explosaoService: ExplosaoService;


    test.describe.parallel('[API LOGIN] Test login', () => {
        test.beforeEach(async ({ playwright }, testInfo ) => {
            const env = process.env;
            explosaoService = new ExplosaoService(env, await playwright.request.newContext());
        });

        test('login should return a token @login', async () => {
            let apiResponse: APIResponse;
        
            await test.step('get token', async () => {
                apiResponse = await explosaoService.getToken();
            });
            
            await test.step('The status code should be 200 in post token request', async () => {
                expect(apiResponse.status(), 'The status code should be 200').toBe(200);
            });

            await test.step('jwtToken should return something', async () => {
              let jsonObject = JSON.parse(await apiResponse.text());
                expect(jsonObject.additionalInfo.jwtToken != null, 'jwt').toBe(true);
            });
        });
            
    });
