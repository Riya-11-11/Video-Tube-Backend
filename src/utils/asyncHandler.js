const asyncHandler = (requestHandler)=>{
    return (req, res, next)=>{
        Promise.resolve(requestHandler(req, res)).catch((err)=>next(err))
    }
}

export {asyncHandler}









//by using higher order fnc and try catch...

// const asyncHandler = (fnc) => async(req, res, next) => {
//     try {
//         await fnc(req, res, next)
//     } catch (error) {
//         //http
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }