module.exports.getMeta = function (data) { 
    var total = 0, entry = 0, exit = 0;
    for(i in data){
        total += 1;
        data[i].entry[0].type == "Entry" ? entry += 1 : exit += 1;
    }
    return {"total": total, "entry": entry, "exit": exit}
};