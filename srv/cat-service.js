const cds = require('@sap/cds')
module.exports = function (){
  this.on ('READ','Books', async (req,next) => {
    const books = await next()
    books.requested = true
    console.log(books)
    return books
  });  
  this.after ('READ','Books', each => {
    if (each.stock > 111) {
      each.title += ` -- 25% discount!`
    }
  });
  this.after ('READ','Books', (books,req) => {
    req.headers.referer = ''
    console.log(req.headers)
  }); 
}