// For storing and rendering the fixed info of input variables' results ** NO CALCULATION involve!!!!!
function collectInputValue() {
    var variablesArray = ['input-report-title', 'input-participant-ID', 'TLFB-summary-info-days', 'n-drinking-days', 'n-heavy-drinking-days', 'n-std-drinks-per-wk', 'drinks-or-drinking-day', 'MI-change-plan-goal'];
    $.each(variablesArray, function(i, name){
        $('#' + name + '-output').html(document.getElementById(name).value);
        $('#' + name).val(''); // Clear the input value
    });
}

var numberTdsArray = [];
// Calculation for TDS Summary Information *** NO COMPLEX CALCULATION involved!!!
function tdsDataCalculation(data) {
    var variableKeys = ['tds1label', 'tds1freq', 'tds1situation', 'tds1amtdrink', 'tds1time', 'tds1socialization', 'tds1mood', 'tds1taste', 'tds1stress', 'tds1emotions', 'tds1motive_other', 'tds1time___1', 'tds1time___2', 'tds1time___3', 'tds1time___4', 'tds1time___5', 'tds2time___1', 'tds2time___2', 'tds2time___3', 'tds2time___4', 'tds2time___5', 'tds3time___1', 'tds3time___2', 'tds3time___3', 'tds3time___4', 'tds3time___5', 'tds2label', 'tds2freq', 'tds2situation', 'tds2amtdrink', 'tds2time', 'tds2socialization', 'tds2mood', 'tds2taste', 'tds2stress', 'tds2emotions', 'tds2motive_other', 'tds3label', 'tds3freq', 'tds3situation', 'tds3amtdrink', 'tds3time', 'tds3socialization', 'tds3mood', 'tds3taste', 'tds3stress', 'tds3emotions', 'tds3motive_other']

    $.each(data[0], function(i, name){
        if ($.inArray(name, variableKeys) !== -1)
        {
            if (/situation/.test(name)) {
                if (data[1][i] == 1) {
                    $('#' + name + '-output').html('Always');
                } else if (data[1][i] == 2) {
                    $('#' + name + '-output').html('Almost always');
                } else if (data[1][i] == 3) {
                    $('#' + name + '-output').html('Frequently');
                } else if (data[1][i] == 4) {
                    $('#' + name + '-output').html('Sometimes');
                }
            }

            else if (/freq/.test(name) && !/freq_other/.test(name)) {
                if (data[1][i] == 1) {
                    $('#' + name + '-output').html('Daily or almost daily');
                }
                else if (data[1][i] == 2) {
                    $('#' + name + '-output').html('4-5 times per week');
                }
                else if (data[1][i] == 3) {
                    $('#' + name + '-output').html('2-3 times per week');
                }
                else if (data[1][i] == 4) {
                    $('#' + name + '-output').html('Once per week');
                }
                else if (data[1][i] == 5) {
                    $('#' + name + '-output').html('Less than once per week');
                }
            }


            else if (/motive_other/.test(name) || /stress/.test(name) || /socialization/.test(name) || /mood/.test(name) || /taste/.test(name) || /emotions/.test(name) ) {

                if ((data[1][i] == 3 & data[1][i] == 4) || data[1][i] !== '') {
                    var textSpan = document.createElement('span');
                    var text = document.createTextNode(name.slice(4) + ": " + data[1][i]);
                    textSpan.appendChild(text);

                    switch (name.substring(0,4)) {
                        case "tds1" :
                            var motiveTd = document.getElementById('tds1motives-output');
                            motiveTd.appendChild(textSpan);
                            break;

                        case "tds2" :
                            var motiveTd = document.getElementById('tds2motives-output');
                            motiveTd.appendChild(textSpan);
                            break;

                        case "tds3" :
                            var motiveTd = document.getElementById('tds3motives-output');
                            motiveTd.appendChild(textSpan);
                            break;
                    }

                }
            }
            else if (/time/.test(name)) {
                if (/time___1/.test(name)) {
                    if (data[1][i] == 1) {
                       $('#' + name.substring(0, 8) + '-output').html('Morning');
                    }
                }

                else if (/time___2/.test(name)) {
                    if (data[1][i] == 1) {
                        $('#' + name.substring(0, 8) + '-output').html('Afternoon');
                    }
                }

                else if (/time___3/.test(name)) {
                    if (data[1][i] == 1) {
                        $('#' + name.substring(0, 8) + '-output').html('Evening');
                    }
                }

                else if (/time___4/.test(name)) {
                    if (data[1][i] == 1) {
                        $('#' + name.substring(0, 8) + '-output').html('At bedtime');
                    }
                }

                else if (/time___5/.test(name)) {
                    if (data[1][i] == 1) {
                        $('#' + name.substring(0, 8) + '-output').html('N/A');
                    }
                }
            }

            else if (/amtdrink/.test(name) && !/amtdrink_varies/.test(name)) {
                if (data[1][i] == 1) {
                    $('#' + name + '-output').html('1-2');
                } else if (data[1][i] == 2) {
                    $('#' + name + '-output').html('3-4');
                } else if (data[1][i] == 3) {
                    $('#' + name + '-output').html('5-6');
                }else if (data[1][i] == 4) {
                    $('#' + name + '-output').html('7-8');
                }else if (data[1][i] == 5) {
                    $('#' + name + '-output').html('9-10');
                }else if (data[1][i] == 6) {
                    $('#' + name + '-output').html('11-12');
                }else if (data[1][i] == 7) {
                    $('#' + name + '-output').html('13-14');
                }else if (data[1][i] == 8) {
                    $('#' + name + '-output').html('more than 14');
                }
            }

            else
            {
                $('#' + name + '-output').html(data[1][i]);
            }
        }
    })
}


/// Get the index for the thirty days period and real calculation involved~~~~~~
function getTheThirtyDaysPeriod(data) {
    //Variables
    var timeSpan = [];
    var timestampIndex = $.inArray('pid_timestamp', data[0]);
    var thirtiethDay = 1;

    $.each(data, function(index, value) { 
        if (index > 0) {
            timeSpan.push(data[index][timestampIndex]);
        }
    });

    var lastSurveyDate = moment(timeSpan[timeSpan.length - 1]).format('YYYY-MM-DD');;
    var checkDate = 0;
    $.each(timeSpan, function(index, value) {
        var dayValue = moment(value).format('YYYY-MM-DD');
        if (moment(lastSurveyDate).diff(dayValue, 'days') < 30 && checkDate == 0) {
            thirtiethDay = index;
            checkDate += 1;
        }
    });
    surveyDataCalculation(data, thirtiethDay, timeSpan.length, timeSpan); 
}

/// For rendering the graphs and High risk table
function surveyDataCalculation(data, thirtyDaysIndex, timeSpanLength, timeSpan) {
    //For the overview high risk drinking
    var drinktotalSeries = [];
    var allDrinktotalSeries = [];
    var excessSeries = [];
    var allTdsData = [];

    /// Get the all the tds from tds baseline csv file 
    var tds1 = $('#tds1label-output').text();
    var tds2 = $('#tds2label-output').text();
    var tds3 = $('#tds3label-output').text();
    var numberTdsArray = [];

    if (tds1 !== "") {
        numberTdsArray.push("tds1: " + document.getElementById("input-tds-one").value);
        if (tds2 !== "") {
            numberTdsArray.push("tds2: " + document.getElementById("input-tds-two").value);
            if (tds3 !== "") {
                numberTdsArray.push("tds3: " + document.getElementById("input-tds-three").value);
            }
        }
    }
    
    var checkForOnce = 0;
    /// Set up the variables
    $.each(numberTdsArray, function(i, value){
        var tdsIdIndex = $.inArray('tds_id___' + (i + 1), data[0]);
        var tdsIdSum = 0;
        var drinktotalIndex = $.inArray('drinkstotal', data[0]);
        var anydrinkIndex = $.inArray('anydrink' + (i + 1), data[0]);
        var anydrinkSum = 0;
        var amtdrinkIndex = $.inArray('amtdrink' + (i + 1), data[0]);
        var amtdrinkSum = 0;
        var amtdrinkNumber = 0;
        var allAmtdrinkSum = 0; 
        var allAmtdrinkNumber = 0;
        var desireIndex = $.inArray('desire_tds' + (i + 1), data[0]);
        var desireSum = 0;
        var desireNumber = 0;
        var excessIndex = $.inArray('excess', data[0]);
        var excessSum = 0;
        var excessNumber = 0;
        var excessZero = 0;
        var excessOne = 0;
        var excessTwo = 0;
        var excessThree = 0;
        var tdsTimeArray = [];
        var amtdrinkAverage;
        var allAmtdrinkAverage; 
        var desireAverage;
        var tdsData = {};

        $.each(data, function(index, val) {
            // tds_id_1 total number
            if (index > 0) {
                //drinktotal for all the input
                if (checkForOnce == 0) {
                    allDrinktotalSeries.push(parseInt(data[index][drinktotalIndex]));
                }

                if (!isNaN(data[index][amtdrinkIndex]) && data[index][amtdrinkIndex] !== "") {
                    allAmtdrinkSum += parseInt(data[index][amtdrinkIndex]);
                    allAmtdrinkNumber += 1;
                }

                if (index >= thirtyDaysIndex) {
                    tdsIdSum += (!isNaN(data[index][tdsIdIndex]) && data[index][tdsIdIndex] !== "") ? parseInt(data[index][tdsIdIndex]) : 0;
                    
                    if (checkForOnce == 0) {
                        drinktotalSeries.push(parseInt(data[index][drinktotalIndex]));
                        excessSeries.push(parseInt(data[index][excessIndex]));
                    }
                    // Time line -- may not be useful
                    if (data[index][tdsIdIndex] == 1 ) {
                        tdsTimeArray.push(moment(data[index][5]).format('hh'));
                    }

                    // anydrink total
                    anydrinkSum += (!isNaN(data[index][anydrinkIndex]) && data[index][anydrinkIndex] !== "" ) ? parseInt(data[index][anydrinkIndex]) : 0 ;

                    // amtdrink average
                    if (!isNaN(data[index][amtdrinkIndex]) && data[index][amtdrinkIndex] !== "") {
                        amtdrinkSum += parseInt(data[index][amtdrinkIndex]);
                        amtdrinkNumber += 1;
                    }

                    // desire_average
                    if (!isNaN(data[index][desireIndex]) && data[index][desireIndex] !== "") {
                        desireSum += parseInt(data[index][desireIndex]);
                        desireNumber += 1;
                    }

                    //excess 0 -- 3 --- may be wrong
                    if (!isNaN(data[index][excessIndex]) && data[index][excessIndex] !== "") {
                        excessNumber += 1;
                        if (data[index][excessIndex] == 0) {
                            excessZero += 1;
                        } else if (data[index][excessIndex] == 1) {
                            excessOne += 1;
                        } else if (data[index][excessIndex] == 2) {
                            excessTwo += 1;
                        } else if (data[index][excessIndex] == 3) {
                            excessThree += 1;
                        }
                    }
                } 
            }
        });
        /// For the last portion for excess 
        $('#excess-zero-output').html(((excessZero/excessNumber)*100).toFixed(1) + "%");
        $('#excess-one-output').html(((excessOne/excessNumber)*100).toFixed(1) + "%");
        $('#excess-two-output').html(((excessTwo/excessNumber)*100).toFixed(1) + "%");
        $('#excess-three-output').html(((excessThree/excessNumber)*100).toFixed(1) + "%");
        
        // Push every result into array after calculation 
        amtdrinkAverage = (amtdrinkSum/amtdrinkNumber) * 2;
        allAmtdrinkAverage = (allAmtdrinkSum/allAmtdrinkNumber) * 2;
        desireAverage = desireSum/desireNumber;

        tdsData = {
            tds_id: value,
            tds_id_number: tdsIdSum,
            anydrink_number: anydrinkSum,
            amtdrink_average: amtdrinkAverage.toFixed(1),
            // tds_timestamps: "After 6pm",
            desire_average: desireAverage.toFixed(1),
            all_amtdrink_average: allAmtdrinkAverage.toFixed(1)
        }
        
        allTdsData.push(tdsData);
        checkForOnce += 1; 
    });

    // Get the tds_drink_id and numebr for tds graph 
    var tdsDrinkingId = [];
    var tdsDrinkingNumber = [];
    $.each(allTdsData, function(index, value) {
        tdsDrinkingId.push(value['tds_id']);
        tdsDrinkingNumber.push(value["all_amtdrink_average"]);
    });

    //draw chart two
    var backgroundColorArrayTds = 'rgba(153, 102, 255, 0.9)';
        // 'rgba(153, 102, 255, 0.5)',
        // 'rgba(255, 159, 64, 0.5)'
        //'rgba(75, 192, 192, 0.5)'
    
    var borderColorArrayTds = 'rgba(153, 102, 255, 1)';
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)'
        //'rgba(75, 192, 192, 1)'


    drawCharts(tdsDrinkingId, tdsDrinkingNumber, backgroundColorArrayTds, borderColorArrayTds, "drinking-over-tds-chart", "Drinking per TDS")
    console.log(tdsDrinkingNumber);
    console.log(tdsDrinkingId);
    //Fill in the number for high risk situations over past month
    var surveyTable = $('#form-D-table').find('tbody');

    $.each(allTdsData, function(index, value) {
        var tdsTr = document.createElement('tr');
        $.each(value, function(k, v) {
            if (k != "all_amtdrink_average") {
                var keyTd = document.createElement('td');
                var valueText = document.createTextNode(v);
                keyTd.appendChild(valueText);
                tdsTr.appendChild(keyTd);
            }
        });
        $('#form-D-table').find('tbody').append(tdsTr);
    });

    ///// Insert missing date and delete duplicated date
    var currentDate;
    var timeSpanLabelArray = [];
    var allDrinktotalSeriesArray = [];

    $.each(timeSpan, function(index, value) {
        var dayValue = moment(value).subtract(1, 'days').format('YYYY-MM-DD'); 
        if (index > 0) {
            if ((moment(dayValue).diff(currentDate, 'days') == 0)) {
                if (allDrinktotalSeries[index] != NaN) {
                    allDrinktotalSeriesArray.splice(-1, 1);
                    allDrinktotalSeriesArray.push(allDrinktotalSeries[index]);
                }
            } else if (moment(dayValue).diff(currentDate, 'days') == 1) {
                currentDate = dayValue;
                timeSpanLabelArray.push(dayValue);
                allDrinktotalSeriesArray.push(allDrinktotalSeries[index]);
            } else if (moment(value).diff(currentDate, 'days') > 1) {
                while (moment(value).diff(currentDate, 'days') > 1) {
                    currentDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');
                    timeSpanLabelArray.push(currentDate);
                    allDrinktotalSeriesArray.push(14);
                }
                currentDate = dayValue;
                timeSpanLabelArray.push(dayValue);
                allDrinktotalSeriesArray.push(allDrinktotalSeries[index]);
            }
        } else {
            currentDate = dayValue;
            timeSpanLabelArray.push(dayValue);
            allDrinktotalSeriesArray.push(allDrinktotalSeries[index]);
        }
    });

    //Chart attributes
    var backgroundColorArray = [];
    var borderColorArray = [];
    var blueColor = 'rgba(54, 162, 235, 0.9)';
    var blueBorder = 'rgba(54, 162, 235, 1)';
    var redColor = 'rgba(255, 99, 132, 0.2)';
    var redBorder = 'rgba(255,99,132,1)';
    var weekNumber = 1;

    for (var i = 0; i < allDrinktotalSeriesArray.length; i ++) {
        if (allDrinktotalSeriesArray[i] == 14 ) {
            backgroundColorArray.push(redColor);
            borderColorArray.push(redBorder);
        } else {
            backgroundColorArray.push(blueColor);
            borderColorArray.push(blueBorder);
        }

        if (i == 0 || i%7 == 0) {
            timeSpanLabelArray[i] = moment(timeSpanLabelArray[i]).format('ddd, M/D') + ' (Week ' + weekNumber + ')';
            weekNumber += 1;
        } else {
            timeSpanLabelArray[i] = moment(timeSpanLabelArray[i]).format('ddd, M/D');
        }
    }
    //Draw chart one
    drawCharts(timeSpanLabelArray, allDrinktotalSeriesArray, backgroundColorArray, borderColorArray, "drinking-over-time-chart", "Drinking per Day");
    
    //For the past drinking
    pastDrinkingSummary(drinktotalSeries);

}


function drawCharts(labelArray, dataArray, backgroundColorArray, borderColorArray, chartID, chartTitle) {
    var ctx = document.getElementById(chartID);
    var myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labelArray,
            datasets: [{
                label: "# of drinks",
                data: dataArray,
                backgroundColor: backgroundColorArray,
                borderColor: borderColorArray,
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true, 
                text: chartTitle
            },
            legend: {
                display: true, 
                labels: {
                    usePointStyle: true
                }
            }, 
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero:true, 
                        max: 14, 
                        stepSize: 1
                    }
                }]
                // xAxes: [{
                //     type: 'time',
                //     time: {
                        // unitStepSize: 7, 
                        // unit: 'day'             
                    // }
                // }]
            }
        }
    });
}

// for Past month drinking table
function pastDrinkingSummary(drinktotalSeries) {
    var drinktotalSum = 0;
    var heavyDrinkDay = 0;
    var moderateDrinkDay = 0;
    var abstinentDrinkDay = 0;
    $.each(drinktotalSeries, function(i, value){
        if (!isNaN(value)) {
            drinktotalSum += value;
        }
        if (value > 4) {
          heavyDrinkDay += 1;
        } else if (value >= 1 && value <= 4 ) {
          moderateDrinkDay += 1;
        } else if (value == 0) {
          abstinentDrinkDay += 1;
        }
    });

    $('#n-heavy-days-output').html(heavyDrinkDay);
    $('#n-moderate-days-output').html(moderateDrinkDay);
    $('#n-abstinent-days-output').html(abstinentDrinkDay);
    var EMACompliance = heavyDrinkDay + moderateDrinkDay + abstinentDrinkDay;
    $('#EMA-compliance-output').html(EMACompliance);

    var averageDrink = drinktotalSum/(EMACompliance - abstinentDrinkDay);
    $('#average-n-drinking-day-output').html(averageDrink.toFixed(1));
}

function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
    }
    return isCompatible;
}

// Method that reads and processes the selected file
function upload(evt) {
    if (!browserSupportFileUpload()) {
        alert('The File APIs are not fully supported in this browser!');
    } else {
        var data = null;
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);evt,
        reader.onload = function(event) {
            var csvData = event.target.result;
            data = $.csv.toArrays(csvData);
            if (data && data.length > 0) {
                alert('Imported -' + data.length + '- rows successfully!');
                if (evt.target.id == 'tds-file-upload') {
                    $('#tds-data').data('csv', data);
                } else if (evt.target.id == 'survey-file-upload') {
                    $('#survey-data').data('csv', data);
                }
               
            } else {
                alert('No data to import!');
            }
        };
        reader.onerror = function() {
            alert('Unable to read ' + file.fileName);
        };
    }
}