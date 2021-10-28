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
        window.alert('Error! Please reload the page.')
    }
    reader.readAsText(fileInput.files[0])
}, false)

//.csv files are encoded slightly differently on Mac vs. Windows. Therefore, we have to have a function that will get the client machine's OS. The csvToArray and formatArray functions will run slightly differently depending on the OS. For now, it is going to be compatible with Windows and Mac OS.

function operatingSystemDetector(input){
    //I want this to be able to detect '\r' in the array string that it is passed (i think .match()? or something). I think it will descriminate against the Mac machine. It then can return a true boolean and be used to modulate the csvToArray function to format the array for Windows machines. Windows = '\r\n', Mac = '\n'(2018)
    const returnNewLine = '\r\n' //This is wrong. Need to find better documentation. Logs "Windows machine" on my Mac.
    
    if (input.includes(returnNewLine)){
        console.log('Windows machine')
        return true
    }else{
        console.log('Mac machine')
        return false
    }


}

//csv parser and formatter

function csvToArray(input){
    operatingSystemDetector(input)
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
        newObject.eDblPrime = Number(array[i].eDblPrime) //Need to replace \r, otherwise it'll log as NaN.
        outputArray.push(newObject);
    }
    return outputArray;
}

