const fs = require('fs'); 

const filePath = "input_data.txt";

// reading the file now, asynchronously
fs.readFile(filePath, (error, data)=>{
    if(error){
        console.log(`Error while reading the file ${filePath}: ", ${JSON.stringify(error)}`);
    }else{




    
    }
})

// now doing it synchronously