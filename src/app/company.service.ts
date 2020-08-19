import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    servicePosts: any = [];
    private updatedPost = new Subject();
    constructor(private http: HttpClient,) { }


    addPost(obj) {

        const postData = {
            companyname: obj.companyname,
            code: obj.code,
            country: obj.country

        }
        const totalemployee = obj.employee;
        this.http.post<{ message: string, id: any }>('http://localhost:3000/api/company/details', postData).subscribe(async res => {
            console.log(res)

            for (let i = 0; i < totalemployee.length; i++) {
                await this.saveEmpData(totalemployee[i], res.id)
                // const eData = {

                //     ename: totalemployee[i].ename,
                //     ecode: totalemployee[i].ecode,
                //     esalary: totalemployee[i].esalary,
                //     epic: totalemployee[i].epic,
                //     companyid:res.id
                // }

                //     this.http.post('http://localhost:3000/api/company/employee', eData).subscribe(res => {
                //         console.log(res);
                // });
                if(i==totalemployee.length-1){
                    alert("added Successfully");
                }
            }
        })


    }

    async saveEmpData(emp, id) {
        const postData = new FormData();

        postData.append("ename", emp.ename);
        postData.append("ecode", emp.ecode);
        postData.append("esalary", emp.esalary);
        postData.append("epic", emp.epic, emp.ename);
        postData.append('companyid', id);
        console.log(postData);


        this.http.post('http://localhost:3000/api/company/employee', postData).subscribe(res => {
            console.log(res)
        });
    }
}