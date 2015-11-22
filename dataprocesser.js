
function processData(data){

    data = data.categories;

    var processedData = [];

    for (var i = 0; i < data.length; i++) {
        var temp = {};

        var currObj = {};
        processedData[i] = currObj;

        currObj["title"] = data[i].name;

        var currArray = [];
        currObj["data"] = currArray;

        temp["offense"] = sepOffenseDefenseObjs(data[i].offense);
        temp["defense"] = sepOffenseDefenseObjs(data[i].defense);

        currArray[0] = ['', 'Offense', 'Defense'];
        var labelCount = temp["offense"]["percentLabels"].length;
        for(var j = 0; j < labelCount; j++)
        {
            currArray[j+1] = [temp["offense"]["percentLabels"][j], temp["offense"]["percent"][j],  temp["defense"]["percent"][j]];
        }
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
