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
    let rows = input.split('\n')
    console.log(rows)
    let minusSlashR = rows.map(element => element.replace('\r', ''))
    console.log(minusSlashR)
}
