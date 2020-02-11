/*
*    main.js
*    Mastering Data Visualization with D3.js
*    10.6 - D3 Brushes
*/

// Global variables
var lineChart,
    donutChart1,
    donutChart2,
    timeline;
var filteredData = {};
var donutData = [];
var parseTime = d3.timeParse("%Y");
var formatTime = d3.timeFormat("%Y");
var color = d3.scaleOrdinal(d3.schemeDark2);

// Event listeners
$("#coin-select").on("change", function() {
    coinChanged();
})
$("#var-select").on("change", function() { 
    lineChart.wrangleData();
    timeline.wrangleData();
})

// Add jQuery UI slider
$("#date-slider").slider({
    range: true,
    max: parseTime("2018").getTime(),
    min: parseTime("2000").getTime(),
    step: 86400000, // One day
    values: [parseTime("2000").getTime(), parseTime("2018").getTime()],
    slide: function(event, ui){
        dates = ui.values.map(function(val) { return new Date(val); })
        xVals = dates.map(function(date) { return timeline.x(date); })

        timeline.brushComponent
            .call(timeline.brush.move, xVals)
    }
});

function arcClicked(arc){
    $("#coin-select").val(arc.data.coin);
    coinChanged();
}

function coinChanged(){
    donutChart1.wrangleData();
    donutChart2.wrangleData();
    lineChart.wrangleData();
    timeline.wrangleData();
}

function brushed() {
    var selection = d3.event.selection || timeline.x.range();
    var newValues = selection.map(timeline.x.invert)

    $("#date-slider")
        .slider('values', 0, newValues[0])
        .slider('values', 1, newValues[1]);
    $("#dateLabel1").text(formatTime(newValues[0]));
    $("#dateLabel2").text(formatTime(newValues[1]));
    lineChart.wrangleData();
}

d3.json("data/patentdata_strings.json").then(function(data){
    // Prepare and clean data
    for (var coin in data) {
        if (!data.hasOwnProperty(coin)) {
            continue;
        }
        filteredData[coin] = data[coin].filter(function(d){
            return !(d["patents"] == null)
        })
        filteredData[coin].forEach(function(d){
            d["patents"] = +d["patents"];
            d["24h_vol"] = +d["24h_vol"];
            d["market_cap"] = +d["market_cap"];
            d["date"] = parseTime(d["date"])
        });
        donutData.push({
            "coin": coin,
            "data": filteredData[coin].slice(-1)[0]
        })
    }

    lineChart = new LineChart("#line-area");

    donutChart1 = new DonutChart("#donut-area1", "24h_vol");
    donutChart2 = new DonutChart("#donut-area2", "market_cap");

    timeline = new Timeline("#timeline-area");

})