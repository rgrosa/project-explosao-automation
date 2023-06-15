import { APIRequestContext, APIResponse } from '@playwright/test';

export class ExplosaoService {

readonly request: APIRequestContext;
env;

    constructor(envData: any, request: APIRequestContext){
        this.env = envData;
        this.request = request;
    }

    async getToken(){
        const response = await this.request.post(this.env.EXPLOSAO_URL+"/login", {
          data: {  	userName :"admin",
                    password:"1admin_explosao1" }
        });
        return response;
    }

    async postClassroom(classroom:any, token:string){
        const response = await this.request.post(this.env.EXPLOSAO_URL+"/classroom/", {
          headers:{ authorization: "Bearer "+ token},
          data: {  	classroomName: classroom.classroomName,
            weekDay: classroom.weekDay,
            classroomTime: classroom.classroomTime,
            classroomEndTime: classroom.classroomEndTime,
            professorName: classroom.professorName,
            status: classroom.status,
            id: classroom.id ?classroom.id : null}
        });
        console.log(response.status())
        return response;
    }
}