// Convert the input json string into an object
var dataString = '{"categories": [{"offense": {"3D Conversion %": "41.38%", "4D Conversion %": "50.00%", "Points/Game": "35.5", "RZ Scoring %": "89.19%", "Yards/Game": "468.6", "Points/Play": "0.469", "Yards/Play": "6.2"}, "defense": {"Opp Yards/Game": "416.5", "Opp Points/Play": "0.325", "Opp Points/Game": "27.6", "Opp RZ Scoring %": "81.25%", "Opp Yards/Play": "4.9", "Opp 4D Conv %": "50.00%", "Opp 3D Conv %": "37.41%"}, "name": "Overall Statistics"}, {"offense": {"Rushes/Game": "36.6", "Yards/Rush": "5.1", "Rush Play %": "48.43%", "Rush Yards/Game": "186.1"}, "defense": {"Opp Rush Yards/Game": "208.5", "Opp Yards/Rush": "4.6", "Opp Rush Play %": "53.31%", "Opp Rushes/Game": "45.2"}, "name": "Rushing Statistics"}, {"offense": {"Passes/Game": "37.8", "Pass Yards/Game": "282.5", "Completion %": "59.27%", "QB Sacked %": "3.21%", "Int Thrown %": "2.98%", "Yards/Pass": "7.5", "Pass Play %": "51.57%"}, "defense": {"Opp Yards/Pass": "5.5", "Opp Completion %": "56.25%", "Opp Passes/Game": "38.0", "Opp Pass Play %": "46.69%", "Opp Int Thrown %": "2.63%", "Sack %": "4.10%", "Opp Pass Yards/Game": "208.0"}, "name": "Passing Statistics"}, {"offense": {"FG Conversion %": "92.86%"}, "defense": {"Opp FG Conv %": "82.35%"}, "name": "Kicking Statistics"}, {"offense": {"Takeaways/Game": "1.4", "TO Margin/Game": "-0.1", "Int Thrown %": "2.98%", "Giveaways/Game": "1.5"}, "defense": {"Takeaways/Game": "1.4", "Opp Int Thrown %": "2.63%", "Giveaways/Game": "1.5", "Opp TO Margin/Game": "+0.1"}, "name": "Turnovers Statistics"}, {"offense": {"Penalties/Play": "0.05", "Penalty Yds/Pen": "9.4", "Penalty Yds/Game": "77.9", "Penalties/Game": "8.2"}, "defense": {"Opp Penalties/Game": "5.8", "Opp Penalty Yds/Game": "48.6", "Opp Penalty Yds/Pen": "8.5", "Opp Penalties/Play": "0.04"}, "name": "Penalties Statistics"}, {"offense": {"TOP % (net OT)": "42.86%"}, "defense": {"Opp TOP % (net OT)": "57.14%"}, "name": "Other Statistics"}]}';
var data = processData(JSON.parse(dataString));

// Load google charts API
google.load("visualization", "1.1", {packages:["corechart", "bar"]});
google.setOnLoadCallback(function() {
    // Once the API is loaded start creating the charts
    generateChartDivs();
    generateCharts(0);
});

// Disable respnsiveness for now
// causing weird bugs
/*$(window).resize(function(){
  generateCharts(0);
});*/

// Generates all the sections for the charts to go
function generateChartDivs() {
    for(var i = 0; i < data.length; i++)
    {
        var key = data[i].title.replace(/\W/g, '');
        var currSection = '<div class="section" id="' + key + 'Section">'
        var currCanvas = '<div id="' + key + 'Chart" class="sectionChart"></div>';

        $("#gamedaychart").append(currSection);
        $("#" + key + "Section").append(currCanvas);
    }
}

// Generates all the charts
function generateCharts(i){
    // Options for each chart
    var options = {
        chart : {
            title : data[i].title,
            subtitle: 'do we want a subheader?',
        },
        bars: 'horizontal', // Required for Material Bar Charts.
        colors: ['#3284BF', '#FFE800'],
        height: data[i].percentData.length * 70 + 15,
        legend: {position: 'none'}
    };

    // Draw the chart to specific div
    var key = data[i].title.replace(/\W/g, '');
    var chart = new google.charts.Bar(document.getElementById(key + 'Chart'));

    // Temporary. Since we don't have non-percent values added yet, we do not want
    //  the header for the section to be visible either
    if(data[i].percentData.length > 1){
        chart.draw(google.visualization.arrayToDataTable(data[i].percentData), options);
    }else{
        generateCharts(i+1);
        return;
    }

    // If we have more charts to draw, draw them
    if(i+1 != data.length){
        // Wait for the previous chart to be loaded
        // This weird implementation was done because calling draw
        //      for all the charts at once was not working.
        //      There was an issue with some callback being overridden
        //      and so only the first chart was showing up.
        $('#' + key + 'Section svg').bind("DOMNodeInserted", function(e) {
            // If the previous chart had no data, remove add non-label nodes
            if(data[i].percentData.length < 2){
                $('#' + key + 'Section g:not(:first)').remove();
            }
            // If loading is complete, load the next chart
            if($(e.target).prop("tagName") == "defs"){
                generateCharts(i+1);
            }
        });
    }
}
