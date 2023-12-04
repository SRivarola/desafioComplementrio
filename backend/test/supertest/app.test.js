import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/dao/factory.js";
const { Product } = dao;

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing Products with auth", () => {
  const model = new Product();
  let dataUser = {
    first_name: "SuperTestGonza",
    last_name: "SuperTestRodriguez",
    mail: "supertest@coder.com",
    photo: "avatar.png",
    age: 33,
    password: "Test1234",
    role: "ADMIN",
  };
  const dataProduct = {
    title: "WhiskeyTest",
    description: "Whiskey for supertest",
    price: "100000",
    status: true,
    thumbnail: ["SuperTest.jpg"],
    code: "546546",
    stock: "45555",
  };
  const dataProductToUpdate = {
    title: "SuperChangeTest",
    description: "ChangeDescription",
    price: "200000",
    status: true,
    thumbnail: ["SuperTestChanged.jpg"],
    code: "546546",
    stock: "45555",
  };
  let idProduct = null;
  let idUser = null;
  let token = {};
  it("Must register an User", async () => {
    const responseCreate = await requester
      .post("/auth/register")
      .send(dataUser);
    const { _body, statusCode } = responseCreate;
    idUser = _body.response;
    expect(statusCode).to.be.equals(201);
  });
  it("Must log in an admin user", async () => {
    const response = await requester.post("/auth/login").send(dataUser);
    const { statusCode, headers } = response;
    token.key = headers["set-cookie"][0].split("=")[0];
    token.value = headers["set-cookie"][0].split("=")[1];
    expect(statusCode).to.be.equals(200);
  });
  it("Must create a product", async () => {
    //this.timeout(5000);
    const responseProduct = await requester.post("/products")
    .send(dataProduct)
    .set("Cookie", [token.key + "=" + token.value]);
    const { _body, statusCode } = responseProduct;
    idProduct = _body.response
    expect(statusCode).to.be.equals(201);
  });
  it("Must respond with an array of products", async () =>{
    const responseGetProd = await requester
    .get("/products");
    const { _body } = responseGetProd;
    expect(Array.isArray(_body.payload.docs)).to.be.equals(true);
  })
  it("Must update a product", async () => {
    const before = await model.readOne(idProduct);
    const response = await requester
    .put("/products/" + idProduct)
    .send(dataProductToUpdate)
    .set("Cookie", [token.key + "=" + token.value]);
    const after = await model.readOne(idProduct);
    expect(before === after).to.be.equals(false);
  });
  it("Must destroy a product", async () => {
    const responseProduct = await requester
    .delete("/products/" + idProduct)
    .set("Cookie", [token.key + "=" + token.value]);
    const {statusCode } = responseProduct;
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
