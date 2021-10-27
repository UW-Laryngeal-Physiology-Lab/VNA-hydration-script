let fileInput = document.getElementById('csvFile')

fileInput.addEventListener('change', function(e){
    console.log(fileInput.files) //sanity check
    const reader = new FileReader()
    reader.onload = function(){
        //sanity check
        console.log(reader.result)

        let outputArray = csvToArray(reader.result)
        let formattedArray = formatArray(outputArray)
        console.log(formattedArray)
        return formattedArray; //Formatted array is here
        
    }
    reader.onerror = function(){
        console.log('ERROR')
    }
    reader.readAsText(fileInput.files[0])
}, false)

//csv parser and formatter

function csvToArray(input){
    let noSlashR = input.replace('\r', '')

    let headers = noSlashR.slice(0, noSlashR.indexOf('\n')).split(',')
    console.log('Headers: '+ headers)

    let rows = noSlashR.slice(noSlashR.indexOf('\n') + 1).split('\n')
    console.log('Rows: ' + rows)

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


function formatArray(array){
    let outputArray = [];
    for (let i = 0; i < array.length; i++){
        let newObject = {}
        newObject.frequency = Number(array[i].frequency)
        newObject.ePrime = Number(array[i].ePrime)
        newObject.eDblPrime = Number(array[i].eDblPrime) //Logging as NaN for some reason
        outputArray.push(newObject);
    }
    return outputArray;
}

