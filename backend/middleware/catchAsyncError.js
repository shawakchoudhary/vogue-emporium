module.exports = (theFunc) => (req, res, next)=>{
 Promise.resolve(theFunc(req,res,next)).catch(next);
}
//To handle request Error for Not filling the proper details of product 