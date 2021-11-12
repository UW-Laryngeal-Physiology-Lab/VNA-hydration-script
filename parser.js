const { Chart } = require("chart.js")

let fileInput = document.getElementById('csvFile')

//Main event listener. This handles most of the function of the site. 
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

fileInput.addEventListener('change', function(){
    console.log(fileInput.files) //sanity check
    const reader = new FileReader()
    reader.onload = function(){
        console.log(reader.result)//sanity check
        let outputArray = csvToArray(reader.result)
        let formattedArray = formatArray(outputArray)
        let calculationArray = calculateHydration(formattedArray)
        let averageHydration = findAverage(calculationArray)
        updatePage(averageHydration);
        return averageHydration;   
    }
    reader.onerror = function(){
        console.log('ERROR')
        window.alert('Error! Please reload the page.')
    }
    reader.readAsText(fileInput.files[0])
}, false)

//csv parser
/////////////////////////
/////////////////////////

function csvToArray(input){
    let noSlashR = input.replace('\r', '')
    let headers = noSlashR.slice(0, noSlashR.indexOf('\n')).split(',')
    console.log('Headers: '+ headers)//sanity check
    let rows = noSlashR.slice(noSlashR.indexOf('\n') + 1).split('\n')
    console.log('Rows: ' + rows)//sanity check
    let array = rows.map(function(row){
        let values = row.split(',')
        let consolidated = headers.reduce(function(object, header, index){
            object[header] = values[index]
            return object
        },{})
        return consolidated
    })
    return array;
}

//csv formatter
///////////////
///////////////

function formatArray(array){
    let outputArray = [];
    for (let i = 0; i < array.length; i++){
        let newObject = {}
        newObject.frequency = Number(array[i].frequency)
        newObject.ePrime = Number(array[i].ePrime)
        newObject.eDblPrime = Number(array[i].eDblPrime) //Need to .replace \r, otherwise it'll log as NaN.
        outputArray.push(newObject);
    }
    return outputArray;
}

//TIME TO DO SOME CALCULATIONS
////////////////////////////////
///////////////////////////////

let osmotic = true;

function calculateHydration(formattedArray){
    if (osmotic === true){
        formattedArray.forEach(element => {
            element.hydration = ((element.ePrime) + ((2.004e-30)*((element.frequency)**3)) - ((1.278e-19)*((element.frequency)**2)) + ((2.633e-9)*((element.frequency))) - 25.29) / (((3.978e-30) * ((element.frequency)**3)) - ((1.811e-19)*((element.frequency)**2)) + ((1.288e-9)*(element.frequency)) + 36.66);
        })
    } else {
        window.alert('This part of the logic tree has not been factored yet. Please refresh and set "osmotic" to true.')
        //Need to factor the vacuum dehydration data and I'm too lazy and bad at math to do that right now.
    }
    console.log(formattedArray)//sanity check
    return formattedArray
}

//Function to find the average hydration
////////////////////////////////////////
////////////////////////////////////////

function findAverage(array){
    let newArray = [];
    let sum = 0;
    array.forEach(element => {
        newArray.push(element.hydration)
    })
    for (let i = 0; i < newArray.length; i++){
        sum += newArray[i]
    }
    let average = (sum / newArray.length)
    console.log('Average hydration: '+ average)
    return average;
}

//Function to update the page
/////////////////////////////
/////////////////////////////

function updatePage(averageHydration){
    let display = document.getElementById('display')
    display.textContent = `The average hydration is ${averageHydration * 100}%`
}

//Function to build graph
//.......................
function buildGraph(array){
    let ctx = document.getElementById('my-chart').getContext('2d');
    const labels = array.frequency;
    const data = {
        labels: labels,
        datasets: [{
            label: 'Passed Array',
            data: array.forEach(element => {element.hydration}),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    }
    let chart = new Chart(ctx, config)

}

