import args from "../config/arguments.js";
import MongoConnect from "../config/mongo.js";
import env from "../config/env.js";

let dao = {};

switch (args.persistence) {
    case "FS":
        console.log("file system: connected");
        const { default: ProductManager } = await import('./manager/ProductManager.js');

        dao = { Product: ProductManager }
        break;
    default: //MONGO
        const mongo = new MongoConnect(env.LINK_MDB);
        mongo.connect_mongo();
        const { default: ProductMongo } = await import('./mongo/products.mongo.js');
        
        dao = { Product: ProductMongo }
        break;
}

export default dao;