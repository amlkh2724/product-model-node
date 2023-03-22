import asyncHandler from "../middleware/asyncHandler.js";
import crudProducts from '../models/product.js'

export const createProduct = asyncHandler(async (req, res, next) => {

    console.log("checkproduct:", createProduct);

    const checkProduct = await crudProducts.create(req.body)
    res.status(200).json({
        success: true,
        data: checkProduct,
    });



})


export const getAllProducts = asyncHandler(async (req, res, next) => {

    const allProducts = await crudProducts.find()
    res.status(200).json({
        success: true,
        data: allProducts,
    })

})