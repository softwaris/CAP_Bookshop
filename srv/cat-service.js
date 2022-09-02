const cds = require('@sap/cds')
module.exports = function (){
  this.on ('READ','Books', async (req,next) => {
    const books = await next()
    books.requested = true
    req.data.test = true
    console.log(books.data)
    return books
  });  
  this.after ('READ','Books', each => {
    if (each.stock > 111) {
      each.title += ` -- 25% discount!`
      //each.author += ` -- Test Aris`
    }
  });
}