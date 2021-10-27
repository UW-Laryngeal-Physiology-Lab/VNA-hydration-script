let fileInput = document.getElementById('csvFile')

fileInput.addEventListener('change', function(e){
    console.log(fileInput.files) //sanity check
    const reader = new FileReader()
    reader.onload = function(){
        //sanity check
        console.log(reader.result)

        let outputArray = csvToArray(reader.result)
        let formattedArray = formatArray(outputArray)
        console.log(outputArray)
        return formattedArray;
        
    }
    reader.onerror = function(){
        console.log('ERROR')
    }
    reader.readAsText(fileInput.files[0])
}, false)

//csv parser and formatter

function csvToArray(input){
    let headers = input.slice(0, input.indexOf('\n')).split(',')
    console.log('Headers: '+ headers)

    let rows = input.slice(input.indexOf('\n') + 1).split('\n')
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
    for (let i = 0; i < array.length; i++){
        for (const [key, value] of Object.entries(array[i])){
            console.log(`${key}: ${value}`)
        }
        
    }
}

