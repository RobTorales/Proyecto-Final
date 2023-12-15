import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
import productController from "../controllers/products.controllers.js";
import { authorization, passportCall } from "../utils.js";


const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get("/", productController.getProducts.bind(productController));
productsRouter.get(
  "/:pid",
  productController.getProductById.bind(productController)
);
productsRouter.post(
  "/",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  productController.addProduct.bind(productController)
);
productsRouter.put(
  "/:pid",
  passportCall("jwt"),
  authorization(["admin"]),
  productController.updateProduct.bind(productController)
);
productsRouter.delete(
  "/:pid",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  productController.deleteProduct.bind(productController)
);

export default productsRouter;