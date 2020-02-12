
var margin = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
};

width = 960;

height = 990;

var formatNumber = d3.format(",d");

var svg = d3.select("#topics")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var width = +svg.attr("width"),
    height = +svg.attr("height");

var groupSpacing = 3,
    cellSpacing = 1,
    cellSize = Math.floor((width - 11 * groupSpacing) / 100) - cellSpacing,
    offset = Math.floor((width - 100 * cellSize - 90 * cellSpacing - 11 * groupSpacing) / 2);

var updateDuration = 125,
    updateDelay = updateDuration / 500;



var label = svg.append("text")
    .attr("class", "label");



const topicsColorMap = {
    "Agrar-, Forstwissenschaften und Tiermedizin": '#A200B8',
    "Bauwesen und Architektur": '#F9FFC7',
    "Biologie": '#FFB3AD',
    "Chemie": '#87A9CC',
    "Geisteswissenschaften": '#FF8E00',
    "Geowissenschaften": '#B8B31A',
    "Informatik, System- und Elektrotechnik": '#C7EBFF',
    "Maschinenbau und Produktionstechnik": '#2000FF',
    "Materialwissenschaft und Werkstofftechnik": '#EB0A00',
    "Mathematik": '#8F5A12',
    "Medizin": '#1AB873',
    "Physik": '#F0C7FF',
    "Sozial- und Verhaltenswissenschaften": '#ADFFDB',
    "Waermetechnik Verfahrenstechnik": '#CDBD9B',  
}
function myColorByKey(key) {
    return topicsColorMap[key]
}

function updateCells(payload) {
    
    const { All, state, ...rest} = payload
    // [color, amout]
    const values = Object.entries(rest).map(([key, value]) => [myColorByKey(key), value])

    function calculateColor() {
        const config = values[0]
        const [colorcode, amount] = config
        
        if (amount === 0){
            
            values.shift()
            return colorcode
        }
        values[0][1] = amount - 1
        return colorcode
    }
    
    n1 = payload.All
    var cell = undefined
    var cell = svg.select("g").remove()
    var cell = svg.append("g")
    .attr("class", "cells")
    .attr("transform", "translate(" + offset + "," + (offset + 30) + ")")
    .selectAll("rect");

    var n0 = cell.size();
    cell = cell
        .data(d3.range(n1));

    cell.exit().transition()
        .delay(function (d, i) { return (n0 - i) * updateDelay; })
        .duration(updateDuration)
        .attr("width", 0)
        .remove();

    cell.enter().append("rect")
        .attr("width", 0)
        .attr("height", cellSize)
        .attr("x", function (i) {
            var x0 = Math.floor(i / 100) % 10, x1 = Math.floor(i % 10);
            return groupSpacing * x0 + (cellSpacing + cellSize) * (x1 + x0 * 10);
        })
        .attr("y", function (i) {
            var y0 = Math.floor(i / 1000), y1 = Math.floor(i % 100 / 10);
            return groupSpacing * y0 + (cellSpacing + cellSize) * (y1 + y0 * 10);
        })
        .attr('fill', calculateColor)
        .transition()
        .delay(function (d, i) { return (i - n0) * updateDelay; })
        .duration(updateDuration)
        .attr("width", cellSize);

    label
        .attr("x", offset + groupSpacing)
        .attr("y", offset + groupSpacing)
        .attr("dy", ".71em")
        .transition()
        .duration(Math.abs(n1 - n0) * updateDelay + updateDuration / 2)
        .ease(d3.easeLinear)
        .tween("text", function () {
            var i = d3.interpolateNumber(n0, n1);
            return function (t) {
                this.textContent = "Total projects by topic " + formatNumber(Math.round(i(t)));
            };
        });
}

let topicsJson = void 0;

let tem = true;


$("#coin-select").on("change", function() {
    index = $(this).val()
    if (index == "Saarland") {
        return
    }
    if (!topicsJson) {
        $.getJSON("../data/topics_per_state.json", data => {
            topicsJson = data
        }) 
    }
    updateTopics(index)
})

$(document).ready(function() {
    $.getJSON("../data/topics_per_state.json", data => {
        topicsJson = data
        updateTopics($("#coin-select").val())
    });
})

function updateTopics(index) {
    console.log(index, topicsJson)
    console.log("Hola mundo" + topicsJson[index])
    updateCells(topicsJson[index]);
}




// (function interval() {
//     if (!json) {
//         $.getJSON("../data/topics_per_state.json", data => {
//             json = data
//         }) 
//     }
//     if (Array.isArray(json)) {
        
//         // update(Math.floor(Math.random() * 100 * 100));
//         update(json[index]);
//         index++
//         tem = false
//     }
//     setTimeout(interval, updateDelay * 100 * 100 + updateDuration + 1000);
// })();

d3.select(self.frameElement).style("height", height + "px");


let f = true
