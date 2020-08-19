import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from "@angular/forms";
import { CompanyService } from './company.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  companyForm: FormGroup;
  employee: FormArray;
  imagePreview: any = [];

  constructor(private formBuilder: FormBuilder,private cservice :CompanyService) { }
  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      companyname: ["", Validators.required],
      code: ["", Validators.required],
      country: ["", Validators.required],
      employee: this.formBuilder.array([this.createItem()])
    });
  }


  createItem(): FormGroup {
    return this.formBuilder.group({
      ename: ["", Validators.required],
      ecode: ["", Validators.required],
      esalary: ["", Validators.required],
      epic: ["", Validators.required],
    });
  }

  addItem(): void {
    this.employee = this.companyForm.get('employee') as FormArray;
    this.employee.push(this.createItem());
  }

  removeitem(i): void {

    this.employee = this.companyForm.get("employee") as FormArray;
    this.employee.removeAt(i);
  }

  additemsubmit() {
    if (this.companyForm.status == "INVALID") {
      alert("Kindly fill all * marked fields");
      return;
    }
    let companyEmployee = [];
    let element = this.companyForm.value
    element.employee.forEach(it => {

      companyEmployee.push(it)
    });
    console.log(companyEmployee)
    console.log(this.companyForm.value.companyname)
    let details = {
      companyname: this.companyForm.value.companyname,
      code: this.companyForm.value.code,
      country:this.companyForm.value.country,
      employee:companyEmployee
    }
    console.log(details)
 
    this.cservice.addPost(details);
    
    this.companyForm.reset();
    // await formData.reduce(async (t, element, indx) => {
    //   console.log(t,element ,indx)
    //   if (t != undefined) {
    //     console.log(indx - 1, t);
    //     await this.createDataObj(indx - 1, t);
    //   }
    //     console.log(indx, element);
    //     await this.createDataObj(indx, element);
    // });

  }
  onImagePicked(e: Event, i) {
    console.log(this.employee)
    this.employee = this.companyForm.get('employee') as FormArray;
    const file = (e.target as HTMLInputElement).files[0];
    console.log(file)
    this.employee.at(i).patchValue(
      { epic: file }
    );
    console.log(this.employee)
    this.employee.at(i).get('epic').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview[i] = reader.result as string;

    }
    reader.readAsDataURL(file)
  }
}
