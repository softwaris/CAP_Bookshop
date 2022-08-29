const cds = require('@sap/cds')
module.exports = function (){
  this.after ('READ','Books', each => {
    if (each.stock > 111) {
      each.title += ` -- 25% discount!`
      each.req = 'Test Aris'
    }
  });
}