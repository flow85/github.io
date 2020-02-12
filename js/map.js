function resize() {
    width = parseInt(d3.select("#wrapper").style("width"));
    width = width - margin.left - margin.right;
    height = width * mapRatio;
    projection.translate([width / 3, height / 3]).center(germany_center).scale(width * [mapRatio + mapRatioAdjuster]);
    svg.style("width", width + "px").style("height", height + "px");
    svg.selectAll("path").attr("d", path);
}

function zoomed() {
    features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var margin = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
};

width = parseInt(d3.select("#wrapper").style("width"));

width = width - margin.left - margin.right;

mapRatio = .5;

height = width * mapRatio;

mapRatioAdjuster = 1.6;

germany_center = [9, 51];

var projection = d3.geo.mercator().center(germany_center).translate([width / 2, height / 2]).scale(
    width * [mapRatio + mapRatioAdjuster]
);

zoom = d3.behavior.zoom().translate([0, 0]).scale(1).scaleExtent([1, 3]).on("zoom", zoomed);

d3.select(window).on("resize", resize);

var svg = d3.select("#wrapper").append("svg").attr("width", width).attr("height", height).call(zoom);

path = d3.geo.path().projection(projection);

features = svg.append("g");

var myColor = (a, b) => d3.scale.linear()
    .range(a)
    .domain(b);

const projectsColorKey = 'PROJECTS_1';
const otherColorKey = 'PATENTS_1';

const setColor = (json, key) => {
    if (key === projectsColorKey) {
        return myColor(["white", "#FF8A0D"], [0, 3505])(json.properties[key]);
    }
    return myColor(["white", "#A0CFE8"], [0, 269952])(json.properties[key]);
}

d3.json("data/germany-topojson.json", function (t, e) {
    if (t) return console.error(t);
    topojson.feature(e, e.objects.DEU_adm1);
    features.selectAll("path").data(topojson.feature(e, e.objects.DEU_adm1).features).enter().append("path")
        .attr("d", path)
        .attr("fill", "#e8d8c3")
        .attr("stroke", "#404040")
        .attr("stroke-width", .2)
        .style("fill", (json) => setColor(json, projectsColorKey))
        .on("mousemove", function (t) {
            d3.select("#tooltip")
                .style("top", d3.event.pageY + 20 + "px")
                .style("left", d3.event.pageX + 20 + "px")
                .select("#state-name-tooltip")
                .text(t.properties.NAME_1);
            d3.select("#tooltip")
                .select("#state-type-tooltip")
                .text(t.properties.TYPE_1);
            d3.select("#state-name")
                .text(t.properties.NAME_1);
            d3.select("#tooltip")
                .classed("hidden", !1);
        }).on("mouseout", function () {
            d3.select("#tooltip").classed("hidden", !0);
        });
});

function test(event) {
    const colorKey = !event.checked ? projectsColorKey : otherColorKey;
    features.selectAll("path").style("fill", (json) => setColor(json, colorKey));
}
