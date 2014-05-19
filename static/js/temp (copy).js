var w = 800,
    h = 600;

var circleWidth = 5;

var fontFamily = 'Bree Serif',
    fontSizeHighlight = '1.5em',
    fontSizeNormal = '1em';

var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }


var ppi_json = {"nodes": [{"name": "Cs8g05790.2", "center": "y"}, {"name": "Cs4g05680.2", "center": "n"}, {"name": "Cs4g16120.1", "center": "n"}, {"name": "Cs5g15220.1", "center": "n"}, {"name": "Cs3g07530.1", "center": "n"}, {"name": "Cs7g17990.1", "center": "n"}, {"name": "Cs6g04500.1", "center": "n"}, {"name": "Cs7g16760.1", "center": "n"}, {"name": "Cs1g03340.1", "center": "n"}, {"name": "Cs2g01210.1", "center": "n"}, {"name": "Cs4g11160.2", "center": "n"}, {"name": "Cs4g14900.3", "center": "n"}, {"name": "orange1.1t01618.1", "center": "n"}, {"name": "orange1.1t04741.1", "center": "n"}, {"name": "Cs4g11160.1", "center": "n"}, {"name": "Cs6g01450.1", "center": "n"}, {"name": "orange1.1t04875.1", "center": "n"}, {"name": "Cs8g13960.1", "center": "n"}, {"name": "Cs2g09500.1", "center": "n"}, {"name": "Cs2g07580.1", "center": "n"}, {"name": "orange1.1t01537.1", "center": "n"}], "links": [{"source": "Cs8g05790.2", "target": "Cs4g05680.2", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs4g16120.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs5g15220.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs3g07530.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs7g17990.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs6g04500.1", "score2": 2.02764976958525, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs7g16760.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs1g03340.1", "score2": 5.04313725490196, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs2g01210.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs4g11160.2", "score2": 2.02764976958525, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs4g14900.3", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "orange1.1t01618.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "orange1.1t04741.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs4g11160.1", "score2": 2.02764976958525, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs6g01450.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "orange1.1t04875.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs8g13960.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs2g09500.1", "score2": 2.28571428571428, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "Cs2g07580.1", "score2": 2.02764976958525, "score1": 0.0}, {"source": "Cs8g05790.2", "target": "orange1.1t01537.1", "score2": 2.28571428571428, "score1": 0.0}]}
             
function mapNodes(nodes){
    nodesMap = d3.map()
    nodes.forEach(function(n){
      nodesMap.set(n.name,n)
    });
    return nodesMap;
}
nodesMap = mapNodes(ppi_json.nodes);
ppi_json.links.forEach(function(l){
    l.source = nodesMap.get(l.source)
    l.target = nodesMap.get(l.target)    
})

var nodes = ppi_json.nodes
var links = ppi_json.links

var vis = d3.select("body")
      .append("svg:svg")
      .attr("class", "stage")
      .attr("width", w)
      .attr("height", h);

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.1)
    .charge(-200)
    .friction(0.95)
    .linkDistance(20)
    .linkStrength(1)
    .size([w, h]);

 var link = vis.selectAll(".link")
          .data(links)
          .enter().append("line")
          .attr("class", "link")
          .attr("stroke", "#CCC")
          .attr("fill", "none");

 var node = vis.selectAll("circle.node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")

      //MOUSEOVER
      .on("mouseover", function(d,i) {
        if (i>0) {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .transition()
          .duration(250)
          .style("cursor", "none")     
          .attr("r", circleWidth+3)
          .attr("fill",palette.orange);

          //TEXT
          d3.select(this).select("text")
          .transition()
          .style("cursor", "none")     
          .duration(250)
          .style("cursor", "none")     
          .attr("font-size","1.5em")
          .attr("x", 15 )
          .attr("y", 5 )
        } else {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .style("cursor", "none")     

          //TEXT
          d3.select(this).select("text")
          .style("cursor", "none")     
        }
      })

      //MOUSEOUT
      .on("mouseout", function(d,i) {
        if (i>0) {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .transition()
          .duration(250)
          .attr("r", circleWidth)
          .attr("fill",palette.pink);

          //TEXT
          d3.select(this).select("text")
          .transition()
          .duration(250)
          .attr("font-size","1em")
          .attr("x", 8 )
          .attr("y", 4 )
        }
      })
      .call(force.drag);

    //CIRCLE
    node.append("svg:circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", circleWidth)
      .attr("fill", function(d, i) { if (i>0) { return  palette.pink; } else { return palette.paleryellow } } )

    //TEXT
    node.append("text")
      .text(function(d, i) { 
          if (d.center == 'y'){
              d.fixed = true;
              d.px = w/2;
              d.py = h/2;
          }
        return d.name; 
      })
      .attr("x",            function(d, i) { if (i>0) { return circleWidth + 5; }   else { return -10 } })
      .attr("y",            function(d, i) { if (i>0) { return circleWidth + 0 }    else { return 8 } })
      .attr("font-family",  "Bree Serif")
      .attr("fill",         function(d, i) { if (i>0) { return  palette.paleryellow; }        else { return palette.yellowgreen } })
      .attr("font-size",    function(d, i) { if (i>0) { return  "1em"; }            else { return "1.8em" } })
      .attr("text-anchor",  function(d, i) { if (i>0) { return  "beginning"; }      else { return "end" } })



force.on("tick", function(e) {
  node.attr("transform", function(d, i) {     
        return "translate(" + d.x + "," + d.y + ")"; 
    });
    
   link.attr("x1", function(d)   { return d.source.x; })
       .attr("y1", function(d)   { return d.source.y; })
       .attr("x2", function(d)   { return d.target.x; })
       .attr("y2", function(d)   { return d.target.y; })
});

force.start();