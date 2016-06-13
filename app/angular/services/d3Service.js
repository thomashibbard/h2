var app = angular.module('h2App');
app.directive('d3Bars', ['$window', '$timeout', 'FoodInspectionDataService', '$log',
  function($window, $timeout, FoodInspectionDataService, $log) {
    return {
      restrict: 'A',
      scope: {
        label: '@',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
        FoodInspectionDataService.getAPIData().then(function(data) {

          var results = {};
          for(var i = 0; i < data.length; i++){
            if(results.hasOwnProperty(data[i].zip)){
              results[data[i].zip]+=1;
            }else{
              results[data[i].zip] = 1;
            }
          }
          var data = [];
          for(var key in results){
            data.push({name: key, score: results[key]});
          }

          data.sort(function(a, b){
            if (a.score > b.score) {
                return -1;
              }
            if (a.score < b.score) {
              return 1;
            }
            return 0;
          })
          scope.data = data.slice(0, 10);
          //scope.data = sorted;
          var renderTimeout;
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barWidth) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;

          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%')
            .style('height', '100%')

          $window.onresize = function() {
            scope.$apply();
          };

          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);

          scope.render = function(data) {
            svg.selectAll('*').remove();

            if (!data) return;
            if (renderTimeout) clearTimeout(renderTimeout);

            renderTimeout = $timeout(function() {
              //console.log(d3.select(ele[0])[0][0].offsetHeight - margin);
              var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                height = scope.data.length * (barHeight + barPadding),
                color = d3.scale.category20(),
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function(d) {
                    return d.score;
                  })])
                  .range([0, width]);
              svg.attr('height', '1000px');

              svg.selectAll('rect')
                  .data(data)
                  .enter()
                  .append('rect')
                  .attr('height', barHeight)
                  .attr('width', 35)
                  .attr('y', Math.round(margin/2))
                  .attr('y', 0)
                  .attr('x', function(d,i) {
                    console.log(d, i)
                   return i * (barHeight + barPadding);
                  })
                  .attr('fill', '#656262')
                  .style("stroke", '#000')
                  .style("stroke-width", 2)
                  //.attr('class', 'bar-chart-vert')
                  .transition()
                  .duration(1000)
                  .attr('height', function(d) {
                    return xScale(d.score);
                  });
              // svg.selectAll('text')
              //   .data(data)
              //   .enter()
              //   .append('text')
              //   .attr('fill', '#fff')
              //   .attr('y', function(d,i) {
              //     return i * (barHeight + barPadding) + 20;
              //   })
              //   .attr('x', 15)
              //   .text(function(d) {
              //     return d.name + " (" + d.score + ")";
              //   });
            }, 200);
          };
        });
      }}
}])