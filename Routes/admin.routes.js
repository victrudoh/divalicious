const express = require("express");
const path = require("path");
const adminController = require("../Controller/admin.controller");
const isAuthenticated = require("../Middlewares/isAuthenticated");
const {authorize} = require("../Middlewares/roleCheck");
const upload = require("../Middlewares/multer");
const uploadExcel = require("../Middlewares/uploadExcel");

const router = express.Router();

// router.get("/login", adminController.loginController);

router.get("/add_product", isAuthenticated, authorize('admin', 'cashier'), adminController.getAddProductController);

router.post("/add_product", upload.single('media'), isAuthenticated, authorize('admin', 'cashier'), adminController.postAddProductController);

router.get("/products", authorize('admin', 'cashier'), adminController.getProductController);

router.post("/productsSort", authorize('admin', 'cashier'), adminController.postSortProductsController);

router.get("/edit_product/:productId", isAuthenticated, authorize('admin', 'cashier'), adminController.getEditProductController);

router.post("/edit_product", upload.single('media'), isAuthenticated, authorize('admin', 'cashier'), adminController.postEditProductController);

router.post("/delete_product", isAuthenticated, authorize('admin', 'cashier'), adminController.postDeleteProductController);

router.post("/disable_product", isAuthenticated, authorize('admin', 'cashier'), adminController.toggleDisableProductController
);

router.get("/dashboard", authorize('admin'), adminController.getDashboardController);

router.get("/orders", authorize('admin'), adminController.getOrdersController);

router.get("/ordersPayment", authorize('admin'), adminController.getOrdersPaymentController);

router.get("/ordersByCashier", authorize('admin'), adminController.getOrderByCashierController);

router.post("/ordersByCashier", authorize('admin'), adminController.postOrdersByCashier);

router.post("/orders", authorize('admin'), adminController.getOrdersController);

router.get("/users", authorize("admin"), adminController.getUsersController);

router.get("/edit_user/:id", authorize("admin"), adminController.postEditUserController);

router.post("/update_user", authorize("admin"), adminController.postUpdateUserController);

router.get("/out_of_stock", authorize("admin", "cashier"), adminController.getDisabledProductsController);

router.post("/upload", upload.single('uploadFile'), authorize("admin, 'cashier'"), adminController.postUploadController);

router.post("/uploadExcel", uploadExcel.single('uploadExcel'), authorize("admin, 'cashier'"), adminController.postUploadExcelController);

router.get("/createUser", authorize("admin"), adminController.getCreateUserController);

router.post("/createUser", authorize("admin"), adminController.postCreateUserController);


module.exports = router;
