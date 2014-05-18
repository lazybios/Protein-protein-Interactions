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

//request the json data through the url
var json ={"nodes": [{"name": "orange1.1t00463.3", "center": "y"}, {"name": "Cs6g04500.1", "center": "n"}, {"name": "Cs6g16010.5", "center": "n"}, {"name": "Cs5g11870.1", "center": "n"}, {"name": "Cs2g21570.3", "center": "n"}, {"name": "Cs3g21120.1", "center": "n"}, {"name": "Cs2g12920.1", "center": "n"}, {"name": "Cs6g09160.1", "center": "n"}, {"name": "orange1.1t00463.1", "center": "n"}, {"name": "Cs2g23520.4", "center": "n"}, {"name": "Cs9g04580.1", "center": "n"}, {"name": "Cs2g01620.3", "center": "n"}, {"name": "Cs5g11590.1", "center": "n"}, {"name": "Cs1g18870.3", "center": "n"}, {"name": "Cs6g07090.1", "center": "n"}, {"name": "Cs9g04580.7", "center": "n"}, {"name": "Cs5g09590.3", "center": "n"}, {"name": "Cs4g18330.1", "center": "n"}, {"name": "Cs7g31530.1", "center": "n"}, {"name": "Cs3g18290.1", "center": "n"}, {"name": "Cs2g12320.2", "center": "n"}, {"name": "Cs9g11250.1", "center": "n"}, {"name": "Cs2g05720.1", "center": "n"}, {"name": "Cs5g02530.3", "center": "n"}, {"name": "Cs8g01200.3", "center": "n"}, {"name": "Cs7g21120.1", "center": "n"}, {"name": "Cs1g20270.1", "center": "n"}, {"name": "Cs4g18760.1", "center": "n"}, {"name": "Cs5g09590.4", "center": "n"}, {"name": "Cs1g14950.1", "center": "n"}, {"name": "Cs6g08760.2", "center": "n"}, {"name": "Cs2g08600.2", "center": "n"}, {"name": "Cs1g24660.1", "center": "n"}, {"name": "Cs7g28280.4", "center": "n"}, {"name": "Cs8g01200.1", "center": "n"}, {"name": "Cs4g17690.1", "center": "n"}, {"name": "Cs5g12310.1", "center": "n"}], "links": [{"source": "orange1.1t00463.3", "target": "Cs6g04500.1", "score2": 5.51612903225806, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs6g16010.5", "score2": 1.66666666666667, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs5g11870.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs2g21570.3", "score2": 0.755102040816326, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs3g21120.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs2g12920.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs6g09160.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "orange1.1t00463.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs2g23520.4", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs9g04580.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs2g01620.3", "score2": 1.28571428571429, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs5g11590.1", "score2": 1.28571428571429, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs1g18870.3", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs6g07090.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs9g04580.7", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs5g09590.3", "score2": 1.28571428571429, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs4g18330.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs7g31530.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs3g18290.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs2g12320.2", "score2": 1.66666666666666, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs9g11250.1", "score2": 1.28571428571429, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs2g05720.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs5g02530.3", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs8g01200.3", "score2": 0.755102040816326, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs7g21120.1", "score2": 1.66666666666666, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs1g20270.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs4g18760.1", "score2": 1.28571428571429, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs5g09590.4", "score2": 1.28571428571429, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs1g14950.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs6g08760.2", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs2g08600.2", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs1g24660.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs7g28280.4", "score2": 1.76190476190476, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs8g01200.1", "score2": 0.755102040816326, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs4g17690.1", "score2": 5.3673469387755, "score1": 0.0}, {"source": "orange1.1t00463.3", "target": "Cs5g12310.1", "score2": 5.3673469387755, "score1": 0.0}]}
             
function mapNodes(nodes){
    nodesMap = d3.map()
    nodes.forEach(function(n){
      nodesMap.set(n.name,n)
    });
    return nodesMap;
}
nodesMap = mapNodes(json.nodes);
json.links.forEach(function(l){
    l.source = nodesMap.get(l.source)
    l.target = nodesMap.get(l.target)    
})

console.log(json.links)

var nodes = json.nodes
var links = json.links

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