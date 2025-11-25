# 📌 Hospital API – Software Testing & Mutation Testing Project

**Course:** Software Testing
**Team Members:**

* **Manas Ranjan Manna** – Developed the complete Hospital API backend
* **Ayan Pushp** – Designed test cases (unit + integration)
* **Both** – Implemented mutation testing using Stryker



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




---

## 📁 Project Repository

Complete tested codebase is available here:
👉 **[https://github.com/manasmanna99/hospital-api](https://github.com/manasmanna99/hospital-api)**

---

## 📘 1. Project Overview

This project demonstrates end-to-end testing of a Node.js + Express + MongoDB based Hospital API.
The work includes:

* Unit testing
* Integration testing
* Mutation testing
* Use of at least **three mutation operators at unit level and three at integration level**
* Clear testing strategy
* Full test-case code
* Testing results and analysis

---

## 🧪 2. Test Case Strategy

The following strategies (listed in project instructions) were used:

### **Unit Testing Strategy: Functional/Logic-based testing**

Applied on:

* Doctor controller
* Patient controller

Focus:

* Checking logical correctness
* Verifying edge cases (wrong password, existing doctor, invalid login etc.)
* Testing controller behavior independent of HTTP layer

### **Integration Testing Strategy: API Endpoint Testing (End-to-End)**

Applied using:

* **MongoMemoryServer** for isolated DB
* **Supertest** for HTTP requests
* Full flow tests: doctor login → patient creation → status fetch

Ensures the interaction of:

* Routes
* Controllers
* Middleware
* JWT authentication
* Database layer

---

## 🧩 3. Tools Used

### **Testing Tools**

| Purpose             | Tool                  |
| ------------------- | --------------------- |
| Unit Testing        | Mocha + Chai          |
| Integration Testing | Supertest             |
| Mock Database       | mongodb-memory-server |
| Assertion Library   | Chai                  |
| Mutation Testing    | **Stryker Mutator**   |

---

## 🧬 4. Mutation Testing Operators Used

Your Stryker report shows many mutation operators automatically applied.
From project instructions, we need at least **3 unit-level** and **3 integration-level** mutation operators.

### ✔ Unit-Level Mutation Operators Used

Stryker applied these operators inside **logic-heavy controller functions**:

| Operator                       | Example from your project                                      |
| ------------------------------ | -------------------------------------------------------------- |
| **Conditional Boundary**       | `==` → `!=`, `>` → `>=`                                        |
| **Block Removal**              | Entire `try/catch` or `if` block removed in patient_controller |
| **String Literal Replacement** | `"Internal error"` → `""`                                      |
| **Object Literal Mutation**    | `{ message: "x" }` → `{}`                                      |

### ✔ Integration-Level Mutation Operators Used

Applied inside API route + model logic:

| Operator                     | Example                                 |
| ---------------------------- | --------------------------------------- |
| **Boolean Literal Mutation** | `required: true` → `false`              |
| **Array Literal Mutation**   | Enum arrays mutated (`["neg"]` → `[]`)  |
| **Method Call Mutator**      | `.sort({ createdAt: 1 })` → `.sort({})` |
| **Route String Mutation**    | `'/update_status/:phone'` → `''`        |

Your mutation score: **24.16%**
This is expected for a beginner-level project with limited tests.

---

## 🧪 5. Designed Test Cases (With Complete Code)

---

# **UNIT TEST CASES (3 Required)**

### File: `test/unit/doctor_controller.spec.js`

```js
const sinon = require('sinon');
const chai = require('chai');
chai.should();

const Doctor = require('../../models/doctor');
const doctorController = require('../../controller/api/v1/doctor_controller');

describe("Doctor Controller Unit Tests", () => {

  it("should return message when passwords do not match", async () => {
    const req = { body: { password: "1234", confirm_password: "5678" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await doctorController.register(req, res);
    res.json.firstCall.args[0].message.should.equal("Passwords do not match");
  });

  it("should return message when doctor already exists", async () => {
    sinon.stub(Doctor, "findOne").resolves({ email: "test@test.com" });

    const req = { body: { email: "test@test.com", password: "123", confirm_password: "123" }};
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await doctorController.register(req, res);
    res.json.firstCall.args[0].message.should.equal("User already exists");

    Doctor.findOne.restore();
  });

  it("should return JWT token on successful login", async () => {
    sinon.stub(Doctor, "findOne").resolves({
      email: "login@test.com",
      password: "secret",
      id: "12345",
    });

    const req = { body: { email: "login@test.com", password: "secret" }};
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await doctorController.login(req, res);
    res.json.firstCall.args[0].data.should.have.property("token");

    Doctor.findOne.restore();
  });

});
```

---

# **INTEGRATION TEST CASES (3 Required)**

### File: `test/integration/doctor_patient_integration.spec.js`

```js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');

const app = require('../../app');
const Doctor = require('../../models/doctor');
const Patient = require('../../models/patient');

describe('Hospital API Integration Tests', function () {
  this.timeout(20000);
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
  });

  it('should register a doctor via /api/v1/doctors/register', async () => {
    const res = await request(app)
      .post('/api/v1/doctors/register')
      .send({
        name: 'Integration Doctor',
        email: 'intdoc@example.com',
        password: 'pass123',
        confirm_password: 'pass123'
      });

    res.status.should.equal(200);
  });

  it('should login doctor and return token', async () => {
    await Doctor.create({
      name: 'Login Doctor',
      email: 'logindoc@example.com',
      password: 'secret'
    });

    const res = await request(app)
      .get('/api/v1/doctors/login')
      .send({
        email: 'logindoc@example.com',
        password: 'secret'
      });

    res.body.data.should.have.property('token');
  });

  it('should create patient and fetch by status', async () => {
    await Doctor.create({
      name: 'Flow Doctor',
      email: 'flowdoc@example.com',
      password: 'secret'
    });

    const loginRes = await request(app)
      .get('/api/v1/doctors/login')
      .send({ email: 'flowdoc@example.com', password: 'secret' });

    const token = loginRes.body.data.token;

    await request(app)
      .post('/api/v1/patients/register')
      .set('Authorization', 'Bearer ' + token)
      .send({ name: 'Flow Patient', phone: '9999999999', age: 30, status: 'neg' });

    const statusRes = await request(app)
      .get('/api/v1/patients/status/neg')
      .set('Authorization', 'Bearer ' + token);

    statusRes.body.data.map(p => p.phone).should.include('9999999999');
  });

});
```

---

## 🧬 6. Mutation Testing Configuration (Stryker)

### File: `stryker.conf.json`

```json
{
  "$schema": "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  "testRunner": "mocha",
  "mochaOptions": {
    "spec": ["test/**/*.spec.js"],
    "require": ["./test/mocha-setup.js"]
  },
  "mutate": ["controller/**/*.js", "models/**/*.js", "routes/**/*.js"],
  "reporters": ["html", "clear-text", "progress"],
  "coverageAnalysis": "off",
  "timeoutMS": 5000
}
```

---

## 📊 7. Mutation Testing Results

**Final Mutation Score:** **24.16%**

### Summary Table (from Stryker)

```
File                      | % Score | Killed | Survived | Timeout
----------------------------------------------------------------
doctor_controller.js      | 72.73   | 26     | 12       | 6
patient_controller.js     |  9.20   | 9      | 148      | 6
models                    | ~16     | 5      | 26       | 0
routes                    | ~52     | 13     | 12       | 0
```

### 📸 Screenshot placeholders

*Add the screenshots from your local generated report here:*

```
/reports/mutation/mutation.html
```

---

## 👥 8. Contribution Summary

### **Manas Ranjan Manna**

* Developed the complete **Hospital API backend**
* Set up Express, routes, controllers, models
* Integrated JWT authentication
* Helped implement mutation testing

### **Ayan Pushp**

* Designed all **unit and integration test cases**
* Helped configure Stryker
* Co-authored mutation-testing strategy and analysis

### **Both**

* Executed Stryker mutation testing
* Analysed survivors, weak spots
* Prepared final testing report

---

## ✅ 9. How to Run Tests

### Unit + Integration Tests

```
npm test
```

### Mutation Testing

```
npx stryker run
```

---

If you want, I can also generate:

✔ A PDF version
✔ A final submission report in university format
✔ A PPT summarizing your work
