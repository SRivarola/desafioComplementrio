/* import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/dao/factory.js";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing Users with Auth", () => {
  let dataUser = {
    first_name: "SuperTestGonza",
    last_name: "SuperTestRodriguez",
    mail: "supertest@coder.com",
    password: "Test1234",
    role: "ADMIN",
  };
  let idUser = null;
  let token = {};
  it("Must register an User", async () => {
    const responseCreate = await requester
      .post("/auth/register")
      .send(dataUser);
    const { _body, statusCode } = responseCreate;
    idUser = _body.response;
    //console.log(idUser);
    expect(statusCode).to.be.equals(201);
  });
  it("Must log in an admin user", async () => {
    const response = await requester.post("/auth/login").send(dataUser);
    const { statusCode, headers } = response;
    token.key = headers["set-cookie"][0].split("=")[0];
    token.value = headers["set-cookie"][0].split("=")[1];
    expect(statusCode).to.be.equals(200);
  });
  it("Must sign out an admin user", async () => {
    const response = await requester
      .post("/auth/signout")
      .set("Cookie", [token.key + "=" + token.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  it("Must destroy the user created for SuperTest", async () => {
    let responseCreate = await requester
      .delete("/auth/" + idUser)
      .set("Cookie", [token.key + "=" + token.value]);
    const { _body, statusCode } = responseCreate;
    idUser = _body.response;
    expect(statusCode).to.be.equals(200);
  });
});
 */