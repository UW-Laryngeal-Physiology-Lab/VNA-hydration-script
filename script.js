let fileInput = document.getElementById('csvFile')

fileInput.addEventListener('change', function(e){
    console.log(fileInput.files) //sanity check
    const reader = new FileReader()
    reader.onload = function(){
        //sanity check
        console.log(reader.result)

        csvToArray(reader.result) 
        return reader.result
    }
    reader.onerror = function(){
        console.log('ERROR')
    }
    reader.readAsText(fileInput.files[0])
}, false)

//csv parser

function csvToArray(input){
    let headers = input.slice(0, input.indexOf('\n')).split(',')
    console.log(headers)

    let rows = input.slice(input.indexOf('\n') + 1).split('\n')
    console.log(rows)

    let array = rows.map(function(row){
        let values = row.split(',')
        let consolidated = headers.reduce(function(object, header, index){
            object[header] = values[index]
            return object
        },{})
        console.log(consolidated)
        return consolidated
    })
    return array;
}

