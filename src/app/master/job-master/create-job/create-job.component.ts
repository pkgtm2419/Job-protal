import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { Editor, Toolbar } from 'ngx-editor';
import { AppService, ToasterService } from 'src/app/_shared/_service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent {
  opportunityForm: any;
  job_description_editor!: Editor;
  required_skills_editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private service: AppService, private toaster: ToasterService) { }

  ngOnInit(): void {
    this.job_description_editor = new Editor();
    this.required_skills_editor = new Editor();
    this.opportunityForm = new FormGroup({
      job_title: new FormControl('', [Validators.required]),
      employment_type: new FormControl('', [Validators.required]),
      work_mood: new FormControl('', [Validators.required]),
      job_description: new FormControl('', [Validators.required]),
      min_yoe: new FormControl('', [Validators.required]),
      max_yoe: new FormControl('', [Validators.required]),
      salary_unit: new FormControl('', [Validators.required]),
      min_salary: new FormControl('', [Validators.required]),
      max_salary: new FormControl('', [Validators.required]),
      show_salary: new FormControl('', [Validators.required]),
      allow_relocation: new FormControl('', [Validators.required]),
      company_name: new FormControl('', [Validators.required]),
      show_recruiter_details: new FormControl('', [Validators.required]),
      industry: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      required_skills: new FormControl('', [Validators.required]),
      available_location: new FormControl('', [Validators.required]),
      preferred_industry: new FormControl('', [Validators.required]),
      qualification: new FormControl('', [Validators.required])
    });
  }

  get formCtrl() {
    return this.opportunityForm.controls;
  }

  refresh(): void {
    this.ngOnInit();
  }

  create(): void {
    if(!this.opportunityForm.valid) {
      this.toaster.warning("Please fill complete form!");
      return;
    }
    let match: any = this.opportunityForm.value;
    console.log(match);
    this.service.createOpportunity(match).subscribe((res: any) => {
      if(res.status) {
        this.toaster.success(res.message);
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }

}
