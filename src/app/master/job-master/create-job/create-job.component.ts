import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { Editor, Toolbar } from 'ngx-editor';
import { AppService, ToasterService } from 'src/app/_shared/_service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';

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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  locations: any = [];
  locationList: any = [];
  filteredLocationList: any;
  qualifications: any = [];
  qualificationList: any = [];
  filteredQualificationList: any;
  skills: any = [];
  skillsList: any = [];
  filteredSkillsList: any;
  industries: any = [];
  industryList: any = [];
  filteredIndustryList: any;
  departmentList: any = [];

  constructor(private service: AppService, private toaster: ToasterService, private router: Router) {}

  ngOnInit(): void {
    this.getQualificationList();
    this.getDepartmentList();
    this.getSkillsList();
    this.getLocationList();
    this.getIndustryList();
    this.job_description_editor = new Editor();
    this.required_skills_editor = new Editor();
    this.opportunityForm = new FormGroup({
      job_title: new FormControl('', [Validators.required]),
      employment_type: new FormControl('', [Validators.required]),
      work_mode: new FormControl('', [Validators.required]),
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

  filterLocation(loc: any) {
    this.filteredLocationList = this.locationList.filter((item: any) => (item.city_name.toLowerCase().indexOf(loc.value.toLowerCase()) > -1));
  }

  filterQualification(loc: any) {
    this.filteredQualificationList = this.qualificationList.filter((item: any) => (item.qualification_name.toLowerCase().indexOf(loc.value.toLowerCase()) > -1));
  }

  filterSkills(loc: any) {
    this.filteredSkillsList = this.skillsList.filter((item: any) => (item.skill_name.toLowerCase().indexOf(loc.value.toLowerCase()) > -1));
  }

  filterIndustry(loc: any) {
    this.filteredIndustryList = this.industryList.filter((item: any) => (item.industry_name.toLowerCase().indexOf(loc.value.toLowerCase()) > -1));
  }

  addLocation(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      let idList = this.locationList.map((item: any) => item.id);
      let max = Math.max(...idList);
      this.locations.push({id: max+1, city_name: value});
    }
    event.chipInput!.clear();
  }

  addQualification(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      let idList = this.qualificationList.map((item: any) => item.id);
      let max = Math.max(...idList);
      this.qualifications.push({id: max+1, qualification_name: value});
    }
    event.chipInput!.clear();
  }

  addSkills(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      let idList = this.skillsList.map((item: any) => item.id);
      let max = Math.max(...idList);
      this.skills.push({id: max+1, skill_name: value});
    }
    event.chipInput!.clear();
  }

  addIndustries(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      let idList = this.industryList.map((item: any) => item.id);
      let max = Math.max(...idList);
      this.industries.push({id: max+1, industry_name: value});
    }
    event.chipInput!.clear();
  }

  removeLocation(id: number): void {
    this.locations = this.locations.filter((item:any) => item.id !== id);
  }

  removeQualifications(id: number): void {
    this.qualifications = this.qualifications.filter((item:any) => item.id !== id);
  }

  removeSkills(id: number): void {
    this.skills = this.skills.filter((item:any) => item.id !== id);
  }

  removePreferredIndustry(id: number): void {
    this.industries = this.industries.filter((item:any) => item.id !== id);
  }

  selectedLocation(event: MatAutocompleteSelectedEvent): void {
    this.locations.push(event.option.value);
  }

  selectedQualification(event: MatAutocompleteSelectedEvent): void {
    this.qualifications.push(event.option.value);
  }

  selectedSkills(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.value);
  }

  selectedIndustry(event: MatAutocompleteSelectedEvent): void {
    this.industries.push(event.option.value);
  }

  getQualificationList(): void {
    let match = '';
    this.service.getQualification(match).subscribe((res: any) => {
      if(res.status) {
        this.qualificationList = res.data;
        this.filteredQualificationList = res.data;
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }

  getDepartmentList(): void {
    let match = '';
    this.service.getDepartment(match).subscribe((res: any) => {
      if(res.status) {
        this.departmentList = res.data;
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }

  getSkillsList(): void {
    let match = '';
    this.service.getSkills(match).subscribe((res: any) => {
      if(res.status) {
        this.skillsList = res.data;
        this.filteredSkillsList = res.data;
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }

  getLocationList(): void {
    let match = '';
    this.service.getLocation(match).subscribe((res: any) => {
      if(res.status) {
        this.locationList = res.data;
        this.filteredLocationList = res.data;
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }

  getIndustryList(): void {
    let match = '';
    this.service.getIndustry(match).subscribe((res: any) => {
      if(res.status) {
        this.industryList = res.data;
        this.filteredIndustryList = res.data;
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
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
        this.opportunityForm.reset();
        this.toaster.success(res.message);
        this.router.navigate(['/master/opportunity']);
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }

}
