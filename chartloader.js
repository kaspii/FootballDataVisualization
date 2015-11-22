Chart.defaults.global.responsive = true;
var ctxOverall = document.getElementById("overallChart").getContext("2d");
var ctxRushing = document.getElementById("rushingChart").getContext("2d");
var ctxPassing = document.getElementById("passingChart").getContext("2d");
var ctxKicking = document.getElementById("kickingChart").getContext("2d");
var ctxTurnovers = document.getElementById("turnoversChart").getContext("2d");
var ctxOther = document.getElementById("otherChart").getContext("2d");

//Offense color scheme RGBs
var fillColorO = "rgba(220,220,220,0.2)",
    strokeColorO = "rgba(220,220,220,1)",
    pointColorO = "rgba(220,220,220,1)",
    pointStrokeColorO = "#fff",
    pointHighlightFillO = "#fff",
    pointHighlightStrokeO = "rgba(220,220,220,1)";

//Defense color scheme RGBs
var fillColorD = "rgba(151,187,205,0.2)",
    strokeColorD = "rgba(151,187,205,1)"
    pointColorD = "rgba(151,187,205,1)"
    pointStrokeColorD = "#fff"
    pointHighlightFillD = "#fff"
    pointHighlightStrokeD = "rgba(151,187,205,1)";


var dataOverall = {
    labels: ["3D Conversion %", "4D Conversion %", "RZ Scoring %"],
    datasets: [
        {
            label: "Offense",
            fillColor: fillColorO,
            strokeColor: strokeColorO,
            pointColor: pointColorO,
            pointStrokeColor: pointStrokeColorO,
            pointHighlightFill: pointHighlightFillO,
            pointHighlightStroke: pointHighlightStrokeO,
            data: [44,54,88]
        },
        {
            label: "Defense",
            fillColor: fillColorD,
            strokeColor: strokeColorD,
            pointColor: pointColorD,
            pointStrokeColor: pointStrokeColorD,
            pointHighlightFill: pointHighlightFillD,
            pointHighlightStroke: pointHighlightStrokeD,
            data: [35,47,81]
        }
    ]
};

var dataRushing = {
    labels: ["Rush Play %"],
    datasets: [
        {
            label: "Offense",
            fillColor: fillColorO,
            strokeColor: strokeColorO,
            pointColor: pointColorO,
            pointStrokeColor: pointStrokeColorO,
            pointHighlightFill: pointHighlightFillO,
            pointHighlightStroke: pointHighlightStrokeO,
            data: [44]
        },
        {
            label: "Defense",
            fillColor: fillColorD,
            strokeColor: strokeColorD,
            pointColor: pointColorD,
            pointStrokeColor: pointStrokeColorD,
            pointHighlightFill: pointHighlightFillD,
            pointHighlightStroke: pointHighlightStrokeD,
            data: [35]
        }
    ]
};

var dataPassing = {
    labels: ["Pass Play %", "Completion %", "Int Thrown %", "QB Sacked %"],
    datasets: [
        {
            label: "Offense",
            fillColor: fillColorO,
            strokeColor: strokeColorO,
            pointColor: pointColorO,
            pointStrokeColor: pointStrokeColorO,
            pointHighlightFill: pointHighlightFillO,
            pointHighlightStroke: pointHighlightStrokeO,
            data: [100,100,100,100]
        },
        {
            label: "Defense",
            fillColor: fillColorD,
            strokeColor: strokeColorD,
            pointColor: pointColorD,
            pointStrokeColor: pointStrokeColorD,
            pointHighlightFill: pointHighlightFillD,
            pointHighlightStroke: pointHighlightStrokeD,
            data: [100,100,100,100]
        }
    ]
};

var dataKicking = {
    labels: ["FG Conversion %"],
    datasets: [
        {
            label: "Offense",
            fillColor: fillColorO,
            strokeColor: strokeColorO,
            pointColor: pointColorO,
            pointStrokeColor: pointStrokeColorO,
            pointHighlightFill: pointHighlightFillO,
            pointHighlightStroke: pointHighlightStrokeO,
            data: [44]
        },
        {
            label: "Defense",
            fillColor: fillColorD,
            strokeColor: strokeColorD,
            pointColor: pointColorD,
            pointStrokeColor: pointStrokeColorD,
            pointHighlightFill: pointHighlightFillD,
            pointHighlightStroke: pointHighlightStrokeD,
            data: [35]
        }
    ]
};

var dataTurnovers = {
    labels: ["Int Thrown %"],
    datasets: [
        {
            label: "Offense",
            fillColor: fillColorO,
            strokeColor: strokeColorO,
            pointColor: pointColorO,
            pointStrokeColor: pointStrokeColorO,
            pointHighlightFill: pointHighlightFillO,
            pointHighlightStroke: pointHighlightStrokeO,
            data: [44]
        },
        {
            label: "Defense",
            fillColor: fillColorD,
            strokeColor: strokeColorD,
            pointColor: pointColorD,
            pointStrokeColor: pointStrokeColorD,
            pointHighlightFill: pointHighlightFillD,
            pointHighlightStroke: pointHighlightStrokeD,
            data: [35]
        }
    ]
};

var dataOther = {
    labels: ["TOP % (net OT)"],
    datasets: [
        {
            label: "Offense",
            fillColor: fillColorO,
            strokeColor: strokeColorO,
            pointColor: pointColorO,
            pointStrokeColor: pointStrokeColorO,
            pointHighlightFill: pointHighlightFillO,
            pointHighlightStroke: pointHighlightStrokeO,
            data: [44]
        },
        {
            label: "Defense",
            fillColor: fillColorD,
            strokeColor: strokeColorD,
            pointColor: pointColorD,
            pointStrokeColor: pointStrokeColorD,
            pointHighlightFill: pointHighlightFillD,
            pointHighlightStroke: pointHighlightStrokeD,
            data: [35]
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

var overallChart = new Chart(ctxOverall).HorizontalBar(dataOverall);
var rushingChart = new Chart(ctxRushing).HorizontalBar(dataRushing);
var passingChart = new Chart(ctxPassing).HorizontalBar(dataPassing);
var kickingChart = new Chart(ctxKicking).HorizontalBar(dataKicking);
var turnoversChart = new Chart(ctxTurnovers).HorizontalBar(dataTurnovers);
var otherChart = new Chart(ctxOther).HorizontalBar(dataOther);
