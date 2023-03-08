// http://172.16.15.251:8002/api/jp/post-job/

// post

payload={
    "id": 2,
    "job_title": "demo job title",
    "employment_type": "ft-p",
    "work_mood": "in_office",
    "job_description": "This field is\n required",
    "min_yoe": 1,
    "max_yoe": 2,
    "salary_unit": "INR",
    "min_salary": 100000,
    "max_salary": 200000,
    "show_salary": true,
    "allow_relocation": true,
    "company_name": "demo company name",
    "show_recruiter_details": true,
    "industry": 3, // "/api/jp/qualification-search?search=query"
    "department": 1, // "/api/jp/department-search?search=query"
    "required_skills": [ // "/api/jp/skill-search?search=query" 
        1,
        2
    ],
    "available_location": [ // "/api/jp/location-search?search=query"
        1,
        3
    ],
    "preferred_industry": [ // "/api/jp/industry-search?search=query"
        1,
        3
    ],
    "qualification": [ // "/api/jp/qualification-search?search=query"
        1
    ]
}

valid_payload={
    "id": 3,
    "job_title": "demo job title",
    "employment_type": "ft-p",
    "work_mood": "in_office",
    "job_description": "This field is\n required",
    "min_yoe": 1,
    "max_yoe": 2,
    "salary_unit": "INR",
    "min_salary": 100000,
    "max_salary": 200000,
    "show_salary": true,
    "allow_relocation": true,
    "company_name": "demo company name",
    "show_recruiter_details": true,
    "industry": 3,
    "department": 1,
    "required_skills": [
        1,
        2
    ],
    "available_location": [
        1,
        3
    ],
    "preferred_industry": [
        3
    ],
    "qualification": [
        1
    ]
}

//get