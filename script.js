let myForm = document.getElementById("myForm");
let csvFile = document.getElementById("csvFile");
let arr;
function csvToArray(str, delimiter = ',') {

    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    let headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    let rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    let arr = rows.map(function (row) {
        let values = row.split(delimiter);
        let el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
    });

    // return the array
    return arr;
}

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let input = csvFile.files[0];
    let reader = new FileReader();
    console.log('Form has been submitted!')
    reader.onload = function (e) {
        let text = e.target.result;
        let data = csvToArray(text);
        document.write(JSON.stringify(data));
    };
    
    reader.readAsText(input);
    return input
});



