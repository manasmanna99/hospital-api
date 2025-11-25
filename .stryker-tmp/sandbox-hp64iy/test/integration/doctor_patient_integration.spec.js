// @ts-nocheck
// test/integration/doctor_patient_integration.spec.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');

const app = require('../../app');
const Doctor = require('../../models/doctor');
const Patient = require('../../models/patient');

describe('Hospital API Integration Tests', function () {
  this.timeout(20000);

  let mongoServer;

  before(async function () {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  after(async function () {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  beforeEach(async function () {
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
  });

  // Integration Test 1: Doctor registration via HTTP
  it('should register a doctor via /api/v1/doctors/register', async function () {
    const res = await request(app)
      .post('/api/v1/doctors/register')
      .send({
        name: 'Integration Doctor',
        email: 'intdoc@example.com',
        password: 'pass123',
        confirm_password: 'pass123'
      });

    // status is always 200 on success in your controller
    // with message 'You have successfully signed up'
    res.should.have.property('status', 200);
    res.body.should.have.property('message', 'You have successfully signed up');

    const docInDb = await Doctor.findOne({ email: 'intdoc@example.com' });
    if (!docInDb) {
      throw new Error('Doctor was not saved to database');
    }
  });

  // Integration Test 2: Doctor login and get JWT token
  it('should login doctor and return JWT token via /api/v1/doctors/login', async function () {
    // first create a doctor directly in DB
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

    res.should.have.property('status', 200);
    res.body.should.have.property('message', 'Sign in successful.Here is your token');
    res.body.should.have.property('data');
    res.body.data.should.have.property('token');
  });

  // Integration Test 3: Full flow - login, register patient, fetch status
  it('should create a patient for a logged in doctor and fetch by status', async function () {
    // Create doctor and get token
    await Doctor.create({
      name: 'Flow Doctor',
      email: 'flowdoc@example.com',
      password: 'secret'
    });

    const loginRes = await request(app)
      .get('/api/v1/doctors/login')
      .send({
        email: 'flowdoc@example.com',
        password: 'secret'
      });

    const token = loginRes.body.data.token;

    // Register patient (default status from your model is probably 'neg')
    const patientRes = await request(app)
      .post('/api/v1/patients/register')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'Flow Patient',
        phone: 9999999999,
        age: 30,
        status: 'neg'
      });

    patientRes.should.have.property('status', 200);
    patientRes.body.should.have.property('message', 'Patient created');

    // Fetch all patients with status code 'neg'
    const statusRes = await request(app)
      .get('/api/v1/patients/status/neg')
      .set('Authorization', 'Bearer ' + token);

    statusRes.should.have.property('status', 200);
    statusRes.body.should.have.property('data');
    statusRes.body.data.should.be.an('array');

    const phones = statusRes.body.data.map((p) => p.phone);
    if (!phones.includes(9999999999)) {
      throw new Error('Expected patient phone not found in status query');
    }
  });
});
