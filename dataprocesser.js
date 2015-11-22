
function processData(data){

    data = data.categories;

    var processedData = [];

    for (var i = 0; i < data.length; i++) {
        var currObj = {};
        processedData[i] = currObj;
        currObj["name"] = data[i].name;
        currObj["offense"] = sepOffenseDefenseObjs(data[i].offense);
        currObj["defense"] = sepOffenseDefenseObjs(data[i].defense);
        currObj["percentLabels"] = currObj["offense"]["percentLabels"].slice();
        currObj["valueLabels"] = currObj["offense"]["valueLabels"].slice();
        delete currObj["offense"]["percentLabels"];
        delete currObj["offense"]["valueLabels"];
        delete currObj["defense"]["percentLabels"];
        delete currObj["defense"]["valueLabels"];
    }

    return processedData;
}

function sepOffenseDefenseObjs(data){
    var percentValues = [];
    var valuesValues = [];
    var percentLabels = [];
    var valueLabels = [];

    var objKeys = Object.keys(data);
    var percentIndex = 0, valueIndex = 0;
    for (var i = 0; i < objKeys.length; i++) {
        if(objKeys[i].indexOf("%") >= 0){
            percentValues[percentIndex] = parseFloat(data[objKeys[i]]);
            percentLabels[percentIndex++] = objKeys[i];
        } else {
            valuesValues[valueIndex] = parseFloat(data[objKeys[i]]);
            valueLabels[valueIndex++] = objKeys[i];
        }
    }

    var processedData = {};
    processedData["percent"] = percentValues;
    processedData["percentLabels"] = percentLabels;
    processedData["values"] = valuesValues;
    processedData["valueLabels"] = valueLabels;

    return processedData;
}
