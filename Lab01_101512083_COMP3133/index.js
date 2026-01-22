// Mansi . , 101512083

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputCsvPath = path.join(__dirname, "input_countries.csv");
const canadaPath = path.join(__dirname, "canada.txt");
const usaPath = path.join(__dirname, "usa.txt");

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


const canadaWrite = fs.createWriteStream(canadaPath, { flags: "a" });
const usaWrite = fs.createWriteStream(usaPath, { flags: "a" });


const header = "country,year,population\n";
canadaWrite.write(header);
usaWrite.write(header);


let canadaCount = 0;
let usaCount = 0;


fs.createReadStream(inputCsvPath)
  .pipe(csv())
  .on("data", (row) => {
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
  .on("end", () => {
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