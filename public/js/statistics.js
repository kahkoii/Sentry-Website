var entryArray = [0,0,0,0,0,0,0,0,0,0,0,0];
var exitArray = [0,0,0,0,0,0,0,0,0,0,0,0];
var hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

for (i in data){
    hour = data[i].entry[0].timeString.substring(0,2);
    index = 0;
    if (hour <= 7)
        index = 0;
    else if (hour >= 18)
        index = 11;
    else{
        for (j = 1; j < 11; j++){
            if (hour == j + 7)
                index = j;
        }
    }
    if (data[i].entry[0].type == "Entry")
        entryArray[index] += 1;
    else
        exitArray[index] += 1;
}

var bar1 = {
    x: hours,
    y: entryArray,
    name: 'Entry',
    type: 'bar'
};

var bar2 = {
    x: hours,
    y: exitArray,
    name: 'Exit',
    type: 'bar'
};

var plotdata = [bar1, bar2];
var layout = {barmode: 'stack'};
Plotly.newPlot('plot', plotdata, layout);