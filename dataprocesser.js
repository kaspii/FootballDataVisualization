
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

Chart.defaults.global.responsive = true;

var dataString = '{"categories": [{"offense": {"3D Conversion %": "41.38%", "4D Conversion %": "50.00%", "Points/Game": "35.5", "RZ Scoring %": "89.19%", "Yards/Game": "468.6", "Points/Play": "0.469", "Yards/Play": "6.2"}, "defense": {"Opp Yards/Game": "416.5", "Opp Points/Play": "0.325", "Opp Points/Game": "27.6", "Opp RZ Scoring %": "81.25%", "Opp Yards/Play": "4.9", "Opp 4D Conv %": "50.00%", "Opp 3D Conv %": "37.41%"}, "name": "Overall Statistics"}, {"offense": {"Rushes/Game": "36.6", "Yards/Rush": "5.1", "Rush Play %": "48.43%", "Rush Yards/Game": "186.1"}, "defense": {"Opp Rush Yards/Game": "208.5", "Opp Yards/Rush": "4.6", "Opp Rush Play %": "53.31%", "Opp Rushes/Game": "45.2"}, "name": "Rushing Statistics"}, {"offense": {"Passes/Game": "37.8", "Pass Yards/Game": "282.5", "Completion %": "59.27%", "QB Sacked %": "3.21%", "Int Thrown %": "2.98%", "Yards/Pass": "7.5", "Pass Play %": "51.57%"}, "defense": {"Opp Yards/Pass": "5.5", "Opp Completion %": "56.25%", "Opp Passes/Game": "38.0", "Opp Pass Play %": "46.69%", "Opp Int Thrown %": "2.63%", "Sack %": "4.10%", "Opp Pass Yards/Game": "208.0"}, "name": "Passing Statistics"}, {"offense": {"FG Conversion %": "92.86%"}, "defense": {"Opp FG Conv %": "82.35%"}, "name": "Kicking Statistics"}, {"offense": {"Takeaways/Game": "1.4", "TO Margin/Game": "-0.1", "Int Thrown %": "2.98%", "Giveaways/Game": "1.5"}, "defense": {"Takeaways/Game": "1.4", "Opp Int Thrown %": "2.63%", "Giveaways/Game": "1.5", "Opp TO Margin/Game": "+0.1"}, "name": "Turnovers Statistics"}, {"offense": {"Penalties/Play": "0.05", "Penalty Yds/Pen": "9.4", "Penalty Yds/Game": "77.9", "Penalties/Game": "8.2"}, "defense": {"Opp Penalties/Game": "5.8", "Opp Penalty Yds/Game": "48.6", "Opp Penalty Yds/Pen": "8.5", "Opp Penalties/Play": "0.04"}, "name": "Penalties Statistics"}, {"offense": {"TOP % (net OT)": "42.86%"}, "defense": {"Opp TOP % (net OT)": "57.14%"}, "name": "Other Statistics"}]}';
var data = JSON.parse(dataString);

var dataTemplate = {
    labels: [],         // use code to fill in
    datasets: [
        {
            label: "Defense",          // use code to fill in
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []           // use code to fill in
        },
        {
            label: "Offense",           // use code to fill in
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []          // use code to fill in
        }
    ]
};

var options = {
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth : 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - Whether the line is curved between points
    bezierCurve : true,
    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,
    //Boolean - Whether to show a dot for each point
    pointDot : true,
    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,
    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

generateChart(processData(data));

function generateChart(data){
    for (var i = 0; i < data.length; i++) {
        var key = data[i].name.replace(/\W/g, '');
        var currSection = '<div class="section" id="' + key + 'Section">'
        var currCanvas = '<canvas id="' + key + 'Chart" class="sectionChart" width="80%" height="50%"></canvas>';
        var nameHeader = '<h1 class="sectionTitle">' + data[i].name + '</h1>'

        $("#gamedaychart").append(currSection);
        $("#" + key + "Section").append(nameHeader);
        $("#" + key + "Section").append(currCanvas);

        var ctx = document.getElementById( key + "Chart").getContext("2d");
        var updatedData = jQuery.extend(true, {}, dataTemplate);
        updatedData.labels = data[i].percentLabels;
        updatedData.datasets[0].data = data[i].defense.percent;
        updatedData.datasets[1].data = data[i].offense.percent;

        ctx.canvas.height = data[i].defense.percent.length * 20 + 10;
        ctx.canvas.width = $("#gamedaychart").width() / 10;

        new Chart(ctx).HorizontalBar(updatedData);
    }
}
