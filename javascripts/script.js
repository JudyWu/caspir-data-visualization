// For storing and rendering the fixed info of input variables' results 
function collect_value() {
    var variables_array = ['inputReportTitle', 'inputParticipantID', 'TLFB_summary_info_days', 'n_drinking_days', 'n_heavy_drinking_days', 'n_std_drinks_per_wk', 'drinks_or_drinking_day', 'MI_change_plan_goal'];
    $.each(variables_array, function(i, name){
        $('#' + name + '_output').html(document.getElementById(name).value);
        $('#' + name).val(''); // Clear the input value
    });
}

var number_tds_array = [];
// Calculation for TDS Summary Information
function tds_data_calculation(data, callback) {
    var variable_keys = ['tds1label', 'tds1freq', 'tds1situation', 'tds1amtdrink', 'tds1time', 'tds1socialization', 'tds1mood', 'tds1taste', 'tds1stress', 'tds1emotions', 'tds1motive_other', 'tds1time___1', 'tds1time___2', 'tds1time___3', 'tds1time___4', 'tds1time___5', 'tds2time___1', 'tds2time___2', 'tds2time___3', 'tds2time___4', 'tds2time___5', 'tds3time___1', 'tds3time___2', 'tds3time___3', 'tds3time___4', 'tds3time___5', 'tds2label', 'tds2freq', 'tds2situation', 'tds2amtdrink', 'tds2time', 'tds2socialization', 'tds2mood', 'tds2taste', 'tds2stress', 'tds2emotions', 'tds2motive_other', 'tds3label', 'tds3freq', 'tds3situation', 'tds3amtdrink', 'tds3time', 'tds3socialization', 'tds3mood', 'tds3taste', 'tds3stress', 'tds3emotions', 'tds3motive_other']

    $.each(data[0], function(i, name){
        if ($.inArray(name, variable_keys) !== -1)
        {
            if (/situation/.test(name)) {
                if (data[1][i] == 1) {
                    $('#' + name + '_output').html('Always');
                } else if (data[1][i] == 2) {
                    $('#' + name + '_output').html('Almost always');
                } else if (data[1][i] == 3) {
                    $('#' + name + '_output').html('Frequently');
                } else if (data[1][i] == 4) {
                    $('#' + name + '_output').html('Sometimes');
                }
            }

            else if (/freq/.test(name) && !/freq_other/.test(name)) {
                if (data[1][i] == 1) {
                    $('#' + name + '_output').html('Daily or almost daily');
                }
                else if (data[1][i] == 2) {
                    $('#' + name + '_output').html('4-5 times per week');
                }
                else if (data[1][i] == 3) {
                    $('#' + name + '_output').html('2-3 times per week');
                }
                else if (data[1][i] == 4) {
                    $('#' + name + '_output').html('Once per week');
                }
                else if (data[1][i] == 5) {
                    $('#' + name + '_output').html('Less than once per week');
                }
            }


            else if (/motive_other/.test(name) || /stress/.test(name) || /socialization/.test(name) || /mood/.test(name) || /taste/.test(name) || /emotions/.test(name) ) {

                if ((data[1][i] == 3 & data[1][i] == 4) || data[1][i] !== '') {
                    var text_span = document.createElement('span');
                    var text = document.createTextNode(name.slice(4) + ": " + data[1][i]);
                    text_span.appendChild(text);

                    switch (name.substring(0,4)) {
                        case "tds1" :
                            var motive_td = document.getElementById('tds1motives_output');
                            motive_td.appendChild(text_span);
                            break;

                        case "tds2" :
                            var motive_td = document.getElementById('tds2motives_output');
                            motive_td.appendChild(text_span);
                            break;

                        case "tds3" :
                            var motive_td = document.getElementById('tds3motives_output');
                            motive_td.appendChild(text_span);
                            break;
                    }

                }
            }
            else if (/time/.test(name)) {
                if (/time___1/.test(name)) {
                    if (data[1][i] == 1) {
                       $('#' + name.substring(0, 8) + '_output').html('Morning');
                    }
                }

                else if (/time___2/.test(name)) {
                    if (data[1][i] == 1) {
                        $('#' + name.substring(0, 8) + '_output').html('Afternoon');
                    }
                }

                else if (/time___3/.test(name)) {
                    if (data[1][i] == 1) {
                        $('#' + name.substring(0, 8) + '_output').html('Evening');
                    }
                }

                else if (/time___4/.test(name)) {
                    if (data[1][i] == 1) {
                        $('#' + name.substring(0, 8) + '_output').html('At bedtime');
                    }
                }

                else if (/time___5/.test(name)) {
                    if (data[1][i] == 1) {
                        $('#' + name.substring(0, 8) + '_output').html('N/A');
                    }
                }
            }

            else if (/amtdrink/.test(name) && !/amtdrink_varies/.test(name)) {
                if (data[1][i] == 1) {
                    $('#' + name + '_output').html('1-2');
                } else if (data[1][i] == 2) {
                    $('#' + name + '_output').html('3-4');
                } else if (data[1][i] == 3) {
                    $('#' + name + '_output').html('5-6');
                }else if (data[1][i] == 4) {
                    $('#' + name + '_output').html('7-8');
                }else if (data[1][i] == 5) {
                    $('#' + name + '_output').html('9-10');
                }else if (data[1][i] == 6) {
                    $('#' + name + '_output').html('11-12');
                }else if (data[1][i] == 7) {
                    $('#' + name + '_output').html('13-14');
                }else if (data[1][i] == 8) {
                    $('#' + name + '_output').html('more than 14');
                }
            }

            else
            {
                $('#' + name + '_output').html(data[1][i]);
            }
        }
    })
    callback();
}

/// Get the index for the thirty days period
function get_the_thirty_days_period(data) {
    //Variables
    var time_span_label = [];
    var timestamp_index = $.inArray('pid_timestamp', data[0]);
    var thirty_surveys_before_date;

    $.each(data, function(index, value) {
        if (index > 0) {
            time_span_label.push(data[index][timestamp_index]);
        }
    });

    var last_survey_date = time_span_label[time_span_label.length - 1];
    var check_for_29 = 0;
    $.each(time_span_label, function(index, value) {
        if (moment(last_survey_date).diff(value, 'days') >= 29 && check_for_29 ==0) {
            thirty_surveys_before_date = index + 1;
            check_for_29 += 1;
            console.log("DONE!");
        } 
    });

    if (typeof thirty_surveys_before_date  === "undefined") {
        thirty_surveys_before_date = 1;
    }
    console.log(thirty_surveys_before_date);
    survey_data_calculation(data, thirty_surveys_before_date, time_span_label.length); 
}

/// For rendering the graphs and High risk table
function survey_data_calculation(data, thirty_days_index, time_span_label_length) {
    //For the overview high risk drinking
    var drinktotal_series = [];
    var all_drinktotal_series = [];
    var excess_series = [];
    var all_tds_data = [];

    /// Get the all the tds from tds baseline csv file 
    var tds1 = $('#tds1label_output').text();
    var tds2 = $('#tds2label_output').text();
    var tds3 = $('#tds3label_output').text();
    var number_tds_array = [];

    if (tds1 !== "") {
        number_tds_array.push("tds1_______________");
        if (tds2 !== "") {
            number_tds_array.push("tds2_______________");
            if (tds3 !== "") {
                number_tds_array.push("tds3_______________");
            }
        }
    }
    
    var check_for_once = 0;
    /// Set up the variables
    $.each(number_tds_array, function(i, value){
        var tds_id_index = $.inArray('tds_id___' + (i + 1), data[0]);
        var tds_id_sum = 0;
        var drinktotal_index = $.inArray('drinkstotal', data[0]);
        var anydrink_index = $.inArray('anydrink' + (i + 1), data[0]);
        var anydrink_sum = 0;
        var amtdrink_index = $.inArray('amtdrink' + (i + 1), data[0]);
        var amtdrink_sum = 0;
        var amtdrink_number = 0;
        var all_amtdrink_sum = 0; 
        var all_amtdrink_number = 0;
        var desire_index = $.inArray('desire_tds' + (i + 1), data[0]);
        var desire_sum = 0;
        var desire_number = 0;
        var excess_index = $.inArray('excess', data[0]);
        var excess_sum = 0;
        var excess_number = 0;
        var excess_0 = 0;
        var excess_1 = 0;
        var excess_2 = 0;
        var excess_3 = 0;
        var tds_time_array = [];
        var amtdrink_average;
        var all_amtdrink_average; 
        var desire_average;
        var tds_data = {};

        $.each(data, function(index, val) {
            // tds_id_1 total number
            if (index > 0) {
                //drinktotal for all the input
                if (check_for_once == 0) {
                    if (parseInt(data[index][drinktotal_index]) == 0) {
                        all_drinktotal_series.push(0.1);
                        console.log(0);
                    } else {
                        all_drinktotal_series.push(parseInt(data[index][drinktotal_index]));
                    }

                }

                if (!isNaN(data[index][amtdrink_index]) && data[index][amtdrink_index] !== "") {
                    all_amtdrink_sum += parseInt(data[index][amtdrink_index]);
                    all_amtdrink_number += 1;
                }

                if (index >= thirty_days_index) {
                    tds_id_sum += (!isNaN(data[index][tds_id_index]) && data[index][tds_id_index] !== "") ? parseInt(data[index][tds_id_index]) : 0;
                    
                    if (check_for_once == 0) {
                        //drinktotal for only 30 days
                        // if (parseInt(data[index][drinktotal_index]) == 0) {
                        //     console.log();

                        // } else {
                        drinktotal_series.push(parseInt(data[index][drinktotal_index]));
                        // }
                       
                        //excess
                        excess_series.push(parseInt(data[index][excess_index]));
                    }
                    // Time line -- may not be useful
                    if (data[index][tds_id_index] == 1 ) {
                        tds_time_array.push(moment(data[index][5]).format('hh'));
                    }

                    // anydrink total
                    anydrink_sum += (!isNaN(data[index][anydrink_index]) && data[index][anydrink_index] !== "" ) ? parseInt(data[index][anydrink_index]) : 0 ;

                    // amtdrink average
                    if (!isNaN(data[index][amtdrink_index]) && data[index][amtdrink_index] !== "") {
                        amtdrink_sum += parseInt(data[index][amtdrink_index]);
                        amtdrink_number += 1;
                    }

                    // desire_average
                    if (!isNaN(data[index][desire_index]) && data[index][desire_index] !== "") {
                        desire_sum += parseInt(data[index][desire_index]);
                        desire_number += 1;
                    }

                    //excess 0 -- 3 --- may be wrong
                    if (!isNaN(data[index][excess_index]) && data[index][excess_index] !== "") {
                        excess_number += 1;
                        if (data[index][excess_index] == 0) {
                            excess_0 += 1;
                        } else if (data[index][excess_index] == 1) {
                            excess_1 += 1;
                        } else if (data[index][excess_index] == 2) {
                            excess_2 += 1;
                        } else if (data[index][excess_index] == 3) {
                            excess_3 += 1;
                        }
                    }
                } 
            }
        });
        /// For the last portion for excess 
        $('#excess_0_output').html(((excess_0/excess_number)*100).toFixed(1) + "%");
        $('#excess_1_output').html(((excess_1/excess_number)*100).toFixed(1) + "%");
        $('#excess_2_output').html(((excess_2/excess_number)*100).toFixed(1) + "%");
        $('#excess_3_output').html(((excess_3/excess_number)*100).toFixed(1) + "%");
        
        // Push every result into array after calculation 
        amtdrink_average = (amtdrink_sum/amtdrink_number) * 2;
        all_amtdrink_average = (all_amtdrink_sum/all_amtdrink_number) * 2;
        desire_average = desire_sum/desire_number;

        tds_data = {
            tds_id: value,
            tds_id_number: tds_id_sum,
            anydrink_number: anydrink_sum,
            amtdrink_average: amtdrink_average.toFixed(1),
            // tds_timestamps: "After 6pm",
            desire_average: desire_average.toFixed(1),
            all_amtdrink_average: all_amtdrink_average.toFixed(1)
        }
        
        all_tds_data.push(tds_data);
        check_for_once += 1; 
    });

    // Get the tds_drink_id and numebr for tds graph 
    var tds_drinking_id = [];
    var tds_drinking_number = [];
    $.each(all_tds_data, function(index, value) {
        tds_drinking_id.push(value['tds_id']);
        tds_drinking_number.push(value["all_amtdrink_average"]);
    });
    chart_drink_over_time(tds_drinking_id, tds_drinking_number, "#ct-chart2")

    //Fill in the number for high risk situations over past month
    var survey_table = $('#form-D-table').find('tbody');

    $.each(all_tds_data, function(index, value) {
        var tds_tr = document.createElement('tr');
        $.each(value, function(k, v) {
            if (k != "all_amtdrink_average") {
                var key_td = document.createElement('td');
                var value_text = document.createTextNode(v);
                key_td.appendChild(value_text);
                tds_tr.appendChild(key_td);
            }
        });
        $('#form-D-table').find('tbody').append(tds_tr);
    });

    //For the graph
    var time_list = []
    for (var i = 1; i <= time_span_label_length; i ++) {
        if (i%5 == 0) {
            time_list.push(i) 
        } else {
            time_list.push(" ")
        }
    }

    chart_drink_over_time(time_list, all_drinktotal_series, "#ct-chart1");
    //For the past drinking
    past_drinking_summary((time_span_label_length - thirty_days_index) + 1, drinktotal_series);

    console.log(drinktotal_series);
    
}

function chart_drink_over_time(time_span_label, drinktotal_series, div_id) {
    var data = {
        labels: time_span_label,
        series: [drinktotal_series]
    };

    var options = {
        high: 14,
        ticks: ['One', 'Two', 'Three'],
        axisY: {
            onlyInteger: true
        },
        seriesBarDistance: 10
    };

    var responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            seriesBarDistance: 7,
            axisX: {
                labelInterpolationFnc: function (value) {
                return value;
                }
            }
        }],
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 3,
            axisX: {
                labelInterpolationFnc: function (value) {
                return value[0];
                }
            }
        }]
    ];
    new Chartist.Bar(div_id, data, options);
}

// for Past month drinking table
function past_drinking_summary(data_length, drinktotal_series) {
    // var EMA_compliance = data.length - 1;
    var EMA_compliance = data_length;
    $('#EMA_compliance_output').html(EMA_compliance);

    var drinktotal_sum = 0;
    var heavy_drink_day = 0;
    var moderate_drink_day = 0;
    var abstinent_drink_day = 0;
    $.each(drinktotal_series, function(i, value){
        if (!isNaN(value)) {
            drinktotal_sum += value;
        }
        if (value > 4) {
          heavy_drink_day += 1;
        } else if (value >= 1 && value <= 4 ) {
          moderate_drink_day += 1;
        } else {
          abstinent_drink_day += 1;
        }
    });

    $('#n_heavy_days_output').html(heavy_drink_day);
    $('#n_moderate_days_output').html(moderate_drink_day);
    $('#n_abstinent_days_output').html(abstinent_drink_day);

    var average_drink = drinktotal_sum/(heavy_drink_day + moderate_drink_day);
    $('#average_n_drinking_day_output').html(average_drink.toFixed(1));
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
                    $('#tds_data').data('csv', data);
                } else if (evt.target.id == 'survey-file-upload') {
                    $('#survey_data').data('csv', data);
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