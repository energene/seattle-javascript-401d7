var angular = require('angular');

describe('Resource Service', function() {
 var testService;
 var $httpBackend;
 var resource;

 beforeEach(angular.mock.module('TeamApp'));
 beforeEach(angular.mock.inject(function(_$httpBackend_, Resource) {
   $httpBackend = _$httpBackend_;
   resource = Resource;
   testService = Resource('test');
 }));
 afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
 });

 it('should be a service', function() {
   expect(typeof resource).toBe('function');
 });

 it('should have prop of resource', function() {
   expect(testService.resource).toBe('test');
 });

 it('should successfully perform a get', function() {
   var success = {name: 'success!'};
   $httpBackend.expectGET('http://localhost:4000/api/test').respond(200, success);
   testService.getAll((err, res) => {
     expect(err).toBe(null);
     expect(res.name).toBe(success.name);
   });
   $httpBackend.flush();
 });

 it('should err appropriately', function() {
   $httpBackend.expectGET('http://localhost:4000/api/test').respond(404, 'what the what?');
   testService.getAll((err, res) => {
     expect(err.data).toBe('what the what?');
     expect(err.status).not.toBe(undefined);
     expect(res).toBe(undefined);
   });
   $httpBackend.flush();
 });

 it('should post successfully', function() {
   var success = {name: 'success OK!'};
   $httpBackend.expectPOST('http://localhost:4000/api/test').respond(200, success);
   testService.create(success, (err, res) => {
     expect(err).toBe(null);
     expect(res.name).toBe(success.name);
   });
   $httpBackend.flush();
 });

 it('should do good PUT', function() {
   var success = {name: 'success put!', _id:1};
   $httpBackend.expectPUT('http://localhost:4000/api/test/1').respond(200, success);
   testService.update(success, (err, res) => {
     expect(err).toBe(null);
     expect(res.name).toBe(success.name);
   });
   $httpBackend.flush();
 });

 it('should kill kill kill', function() {
   var success = {name: 'success kill!', _id:1};
   $httpBackend.expectDELETE('http://localhost:4000/api/test/1').respond(200, success);
   testService.delete(success, (err, res) => {
     expect(err).toBe(null);
     expect(res.name).toBe(success.name);
   });
   $httpBackend.flush();
 });
});
