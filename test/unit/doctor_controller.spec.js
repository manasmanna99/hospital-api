// test/unit/doctor_controller.spec.js
const sinon = require('sinon');
const { expect } = require('chai');

const Doctor = require('../../models/doctor');
const jwt = require('jsonwebtoken');
const doctorController = require('../../controller/api/v1/doctor_controller');

describe('Doctor Controller Unit Tests', function () {
  let req;
  let res;
  let statusStub;
  let jsonStub;

  beforeEach(function () {
    req = { body: {} };
    jsonStub = sinon.stub();
    statusStub = sinon.stub().returns({ json: jsonStub });
    res = {
      status: statusStub
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should return message when passwords do not match', async function () {
    req.body = {
      email: 'doc@example.com',
      password: 'abc',
      confirm_password: 'xyz'
    };

    await doctorController.create(req, res);

    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledOnce).to.be.true;
    expect(jsonStub.firstCall.args[0]).to.deep.equal({
      message: 'Passwords do not match'
    });
  });

  it('should return message when doctor already exists', async function () {
    req.body = {
      email: 'doc@example.com',
      password: 'abc',
      confirm_password: 'abc'
    };

    const fakeDoctor = { _id: '123', email: 'doc@example.com' };

    sinon.stub(Doctor, 'findOne').resolves(fakeDoctor);

    await doctorController.create(req, res);

    expect(Doctor.findOne.calledOnce).to.be.true;
    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledOnce).to.be.true;
    expect(jsonStub.firstCall.args[0]).to.deep.equal({
      message: 'You are already registered.Please signin'
    });
  });

  it('should create a new doctor when data is valid and email not used', async function () {
    req.body = {
      name: 'Dr Test',
      email: 'newdoc@example.com',
      password: 'abc',
      confirm_password: 'abc'
    };

    sinon.stub(Doctor, 'findOne').resolves(null);
    const createStub = sinon.stub(Doctor, 'create').resolves({ _id: '456', email: 'newdoc@example.com' });

    await doctorController.create(req, res);

    expect(Doctor.findOne.calledOnce).to.be.true;
    expect(createStub.calledOnce).to.be.true;
    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledOnce).to.be.true;
    expect(jsonStub.firstCall.args[0]).to.deep.equal({
      message: 'You have successfully signed up'
    });
  });

  it('should return error message for invalid login', async function () {
    req.body = {
      email: 'unknown@example.com',
      password: 'wrong'
    };

    sinon.stub(Doctor, 'findOne').resolves(null);

    await doctorController.createSession(req, res);

    expect(Doctor.findOne.calledOnce).to.be.true;
    expect(statusStub.calledWith(422)).to.be.true;
    expect(jsonStub.firstCall.args[0]).to.deep.equal({
      message: 'Invalid username/password'
    });
  });

  it('should return JWT token on successful login', async function () {
    const fakeDoctor = {
      _id: '123',
      email: 'doc@example.com',
      password: 'secret',
      toJSON() {
        return { _id: this._id, email: this.email };
      }
    };

    req.body = {
      email: 'doc@example.com',
      password: 'secret'
    };

    sinon.stub(Doctor, 'findOne').resolves(fakeDoctor);
    sinon.stub(jwt, 'sign').returns('fake-jwt-token');

    await doctorController.createSession(req, res);

    expect(Doctor.findOne.calledOnce).to.be.true;
    expect(jwt.sign.calledOnce).to.be.true;
    expect(statusStub.calledWith(200)).to.be.true;

    const responseBody = jsonStub.firstCall.args[0];
    expect(responseBody.message).to.equal('Sign in successful.Here is your token');
    expect(responseBody.data).to.have.property('token', 'fake-jwt-token');
  });
});
