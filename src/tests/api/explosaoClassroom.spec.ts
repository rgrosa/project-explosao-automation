
import { expect, test, APIResponse } from '@playwright/test';
import { ExplosaoService } from '../../services/explosaoService';
require('dotenv').config()

let explosaoService: ExplosaoService;


    test.describe.parallel('[API CLASSROOM] Test Classroom', () => {
        test.beforeEach(async ({ playwright }, testInfo ) => {
            const env = process.env;
            explosaoService = new ExplosaoService(env, await playwright.request.newContext());
        });

        test('test classroom @classroom', async () => {
            let apiResponse: APIResponse;
            let jwtToken: string;
            let originalClassroom: any;
            let classroomCreated: any;

            await test.step('Get login token', async () => {
                apiResponse = await explosaoService.getToken();
                jwtToken = JSON.parse(await apiResponse.text()).additionalInfo.jwtToken;
                expect(jwtToken != null, 'the token should not be null').toBe(true);
            });

            await test.step('Create a classroom', async () => {
                originalClassroom = createClassroom();
                console.dir("new classrom object = " + originalClassroom);
                apiResponse = await explosaoService.postClassroom(originalClassroom, jwtToken);
                expect(apiResponse.status(), 'api should return 200').toBe(200);
            });

            await test.step('Validate new classroom', async () => {
                console.dir(JSON.parse(await apiResponse.text()))
                classroomCreated = JSON.parse(await apiResponse.text()).additionalInfo;
                expect(classroomCreated.classroomName == originalClassroom.classroomName, 'classroom name should be equal the original object').toBe(true);
                expect(classroomCreated.weekDay == originalClassroom.weekDay, 'week day should be equal the original object').toBe(true);
                expect(classroomCreated.classroomTime == originalClassroom.classroomTime, 'classroomTime should be equal the original object').toBe(true);
                expect(classroomCreated.classroomEndTime == originalClassroom.classroomEndTime, 'classroomEndTime should be equal the original object').toBe(true);
                expect(classroomCreated.professorName == originalClassroom.professorName, 'professorName should be equal the original object').toBe(true);
                expect(classroomCreated.status == originalClassroom.status, 'status should be equal the original object').toBe(true);
                expect(classroomCreated.id != null, 'id should not be null').toBe(true);
            });

            await test.step('delete the classroom', async () => {
                classroomCreated.status = false;
                apiResponse = await explosaoService.postClassroom(classroomCreated, jwtToken);
                expect(apiResponse.status(), 'api should return 200').toBe(200);
            });
 
        });
            
    });
    function createClassroom(){
        return {
            classroomName:"XAXA12222",
            weekDay:3,
            classroomTime:"11:40",
            classroomEndTime:"11:50",
            professorName:"Renan",
            status:true
        }
    }
