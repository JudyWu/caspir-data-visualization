$(document).ready(function(){
  var upload_section = document.getElementById("upload-csv-section");
  var chart_section = document.getElementById("chart-section");
  var form_section = document.getElementById("form-section");
  var go_back = document.getElementById("go-back-button");

  $("#upload-button").on("click", function(){
    upload_section.style.display = 'none';
    chart_section.style.display = 'block';
    form_section.style.display = 'block';
    var today = moment().format('MMMM Do, YYYY');
    $("#report-date").html(today);

    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
        [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
        [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
      ]
    };

    var options = {
      seriesBarDistance: 15
    };

    var responsiveOptions = [
      ['screen and (min-width: 641px) and (max-width: 1024px)', {
        seriesBarDistance: 10,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value;
          }
        }
      }],
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    new Chartist.Bar('#ct-chart1', data, options, responsiveOptions);
    var data = {
      labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
      series: [
        [5, 4, 3, 7, 5, 10],
        [3, 2, 9, 5, 4, 6],
        [2, 1, -3, -4, -2, 0]
      ]
    };

    // We are setting a few options for our chart and override the defaults
    var options = {
      // Don't draw the line chart points
      showPoint: false,
      // Disable line smoothing
      lineSmooth: false,
      // X-Axis specific configuration
      axisX: {
        // We can disable the grid for this axis
        showGrid: false,
        // and also don't show the label
        showLabel: false
      },
      // Y-Axis specific configuration
      axisY: {
        // Lets offset the chart a bit from the labels
        offset: 60,
        // The label interpolation function enables you to modify the values
        // used for the labels on each axis. Here we are converting the
        // values into million pound.
        labelInterpolationFnc: function(value) {
          return '$' + value + 'm';
        }
      }
    };
    // All you need to do is pass your configuration as third parameter to the chart function
    new Chartist.Line('#ct-chart2', data, options);
  });

  $("#go-back-button").on("click", function() {
    upload_section.style.display = 'block';
    chart_section.style.display = 'none';
    form_section.style.display = 'none';
  });
});