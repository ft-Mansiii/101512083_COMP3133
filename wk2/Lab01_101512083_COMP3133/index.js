// Mansi . , 101512083


// import all the modules 
const fs = require('fs'); // file system 
const path = require('path'); // build file path safely on any OS // path.join makes paths correct everywhere
const csv = require('csv-parser'); //  third party package that i installed , take sraw csv text and converts each row into an object


// all the files paths 
const inputCsvPath = path.join(__dirname, "input_countries.csv"); // __dirname means tha the directory is in this JS file 
const canadaPath = path.join(__dirname, "canada.txt");
const usaPath = path.join(__dirname, "usa.txt");


// deleete function 
function deleteIfExists(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted existing file: ${path.basename(filePath)}`);
    }
  } catch (err) {
    console.error(`Error deleting ${path.basename(filePath)}:`, err.message);
  }
}


deleteIfExists(canadaPath);
deleteIfExists(usaPath);



// A stream lets you write little by little, as you process rows.

const canadaWrite = fs.createWriteStream(canadaPath, { flags: "a" }); // a is for append, append also creates the files automatically if not present
const usaWrite = fs.createWriteStream(usaPath, { flags: "a" }); // w is for overwrite


const header = "country,year,population\n";
canadaWrite.write(header);
usaWrite.write(header);


let canadaCount = 0;
let usaCount = 0;

//fs.createReadStream(...) crwates a readable stream, node reads the file in chunks basically


fs.createReadStream(inputCsvPath)
  .pipe(csv()) // connectes the streams: the file stream outputs text, csv-parser consumes that text
  //the "data" event runs once per row
  .on("data", (row) => { // (row) is just the parameter of a callback function. Node calls this function for me and passes the row object.”
        const country = (row.country || "").trim().toLowerCase();

    // Build output line in exact requested format
    const line = `${(row.country || "").trim().toLowerCase()},${(row.year || "").trim()},${(row.population || "").trim()}\n`;

    if (country === "canada") {
      canadaWrite.write(line);
      canadaCount++;
    } else if (country === "united states" || country === "usa") {
      // Some datasets might use "United States" or "USA"
      usaWrite.write(line);
      usaCount++;
    }
  })
  .on("end", () => { // so end() close the write stream, fluses tany buffered output, closes the file handle

    // Close write streams
    canadaWrite.end();
    usaWrite.end();

    console.log("CSV processing finished.");
    console.log(`Canada rows written: ${canadaCount}`);
    console.log(`USA rows written: ${usaCount}`);
    console.log("Output files created: canada.txt, usa.txt");
  })
  .on("error", (err) => {
    console.error("Error reading CSV:", err.message);
  });

  // so since this is an event based code, we register a handler .on("data", handler), node calls this later whenever a row is ready
  // the script isnt top to bottom, its, setup pipeline-> wait fo rveents-> react when event happens