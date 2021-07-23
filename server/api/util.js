const UserEntry = require("../models/user");
// 1 is add  and 0 is sub
function updateNumberOfArticles(tShirts,tPants, type, arithmatic) {
    var updatedTotalNumberOfShirts = tShirts;
    var updatedTotalNumberOfPants = tPants;
    console.log('debugs' + updatedTotalNumberOfShirts + updatedTotalNumberOfPants + type);
    if (type === 'shirt' && arithmatic === 1) {
        var updatedTotalNumberOfShirts = tShirts + 1;
    } else if (type === 'shirt' && arithmatic === 0) {
        var updatedTotalNumberOfShirts = tShirts - 1;
    } else if (type === 'pants' && arithmatic === 1) {
        var updatedTotalNumberOfPants = tPants + 1;
    } else {
        var updatedTotalNumberOfPants = tPants - 1;
    }
    console.log(updatedTotalNumberOfShirts, updatedTotalNumberOfPants);
    var total =[updatedTotalNumberOfShirts,updatedTotalNumberOfPants];
    return total
}
module.exports = {
    updateNumberOfArticles
}