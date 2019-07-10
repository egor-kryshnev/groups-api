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
          .get("/api/getOneGroupById/5d1d9f33a2c10d05e01f562f")
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
  describe("#GET /api/getOneGroupByName/:name", function() {
    context("when ID is valid", function() {
      it("should return group details", function(done) {
        this.timeout(10000);
        request(server.app).get(
          "/api/getOneGroupByName/5d1d9f33a2c10d05e01f562f"
        );
      });
    });
  });
});
