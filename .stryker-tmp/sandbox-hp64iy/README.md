If want to run locally,first install the packages using command 
->npm install

Now you can start the project using 
->npm start


*************For testing using the hosted url*************
the api is hosted on "https://hospitalapi-yb7y.onrender.com/"
This will open the homepage where some details are given

Below are the list of working routes which you can test using postman

***For Doctor***
api/v1/doctor/register : This(POST request) will handle the registration of new doctor
api/v1/doctor/login : This(GET request) is create the jwt token which is required to perform all patients related operations

***For Patients***
[Note: Make sure all te below operation will require to pass the authorisation token in header]

api/v1/patients/register : This(POST request) will handle the registration of new patient.
api/v1/patients/create_report/:phone : This(GET request) will generate the report of a particular patient.Pass the phone number of the patient in params.
api/v1/patients/all_reports : This(GET request) will genarate all patients report.No need to pass any phone number
api/v1/patients/update_status/:phone : This(GET request) will update the current checkup status of the patient.Pass the phone number of the patient in params.Also add a key 'newstatus' in the body and the value should be new status.
api/v1/patients/status/:status : This(GET request) is generate all the patient report of a particular status.Pass the state code in the params.

The status code for the patients are:
1)neg : Patient is negative
2)trav-quar : Patient had travelled and quarentined
3)sym-quar : Patients had symtoms and quarentined
4)pos-admit : Patients is covid positive and admitted

While creating or changing status of patient,use any of these 4 status codes