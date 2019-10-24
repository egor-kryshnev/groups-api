const { expect } = require("chai");
const { Server } = require("../server");
const request = require("supertest");

describe("router", function() {
  var server;
  before(function() {
    server = new Server();
  });

  describe("#GET /api/getOneGroupById/:id", function() {
    context("when ID is valid", function() {
      it("should return group details", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getOneGroupById/5d46a9c76533f31bb00a961c")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  describe("#GET /api/getAllGroups", function() {
    context("when all groups returned", function() {
      it("should return groups details", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getAllGroups")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  describe("#GET /api/getAllGroups", function() {
    context("when all groups returned", function() {
      it("should return groups details", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getAllGroups")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  describe("#GET /api/allGroups/getGroupsByPersonAdmin/:id", function() {
    context("when groups by admin returned", function() {
      it("should return admin groups", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/allGroups/getGroupsByPersonAdmin/5d4689e4c625210a80202ba7")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  describe("#GET /api/allGroups/getGroupsByPersonNotAdmin/:id", function() {
    context("when groups by not admin returned", function() {
      it("should return Not admin groups", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/allGroups/getGroupsByPersonNotAdmin/5d2594e36fcb691a0d178a71")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  describe("#GET /api/getOneGroupById/:id", function() {
    context("when Id group return all group details", function() {
      it("should return group details by ID", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getOneGroupById/5d46a9c76533f31bb00a961c")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  describe("#GET /api/getAllGroupMembersByID/:id", function() {
    context("when Id group return all members of group ", function() {
      it("should return group members", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getAllGroupMembersByID/5d46a9c76533f31bb00a961c")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  describe("#GET /api/getAllGroupMembersByID/:id", function() {
    context("when Id group return all members of group ", function() {
      it("should return group members", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getAllGroupMembersByID/5d46a9c76533f31bb00a961c")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  context('when request is Valid', function () {
    it('Should return group created', function (done) {
    const ValidReq = { "name": "test", "people": [], "imgPath" : "assets/img/default2.png", "description" : "test"};
    request(server.app)
        .post('/api/createGroup')
        .send(ValidReq)
        .expect(200)
        .end((err, res) => {
          if (err) {
              return done(err);
          }
        return done();
          });
        });
      });


});

