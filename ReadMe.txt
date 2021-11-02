Script created by Jack Ersbo, 11/2/2021

This is a browser script that functions to calculate hydration from a vector network analyzer output.

Instructions and Considerations:

In order to make it function, you will need to change the names of a couple parameters as follows:
        e' => ePrime
        e'' => eDblPrime
You can change these variable names in the settings of the VNA or in the resulting csv file. If you go the file route, be sure to make the changes in a text editor, such as notepad or text editor on Mac.

Once you have changed the parameter names, you are ready to launch the site. Simply open index.html in any browser (if you don't use Chrome, you should).

From there, just click 'choose file' and upload the target csv file. The submit button isn't functioning at the time I'm writing this. The script is initiated with a 'change' event at the 'choose file' button. 

You are now finished. You can view the console by pressing F12 or by opening dev tools in the browser. The console will contain the full array of hydration values. I'm still working on an file export function, so this will have to do for now. 
