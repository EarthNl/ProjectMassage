var fs = require("fs");
const path = require("path");
const crc = require('crc');
//------------------------------------------------------------------------------------------------------------------------------------------
function addfile(file,filePath) {
  fs.rename(file.path, filePath, (err) => {
    if (err) {
      // Handle error appropriately and send an error response
      return res.status(500).json({ error: "Failed to store the file" });
    }
  });
}

function addfileBase64(file,filePath) {
  const base64Data = file.content.split(";base64,").pop();

  // Write the image file to disk
  fs.writeFile(filePath, base64Data, { encoding: "base64" }, (err) => {
    if (err) {
      console.error(`Error saving image ${file.name}:`, err);
      return;
    }
    console.log(`Image saved: ${filePath}`);
  });
}

//remove file in folder
function removefile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err && err.code == "ENOENT") {
      console.info("Error! File doesn't exist.");
    } else if (err) {
      console.error("Something went wrong. Please try again later.");
    } else {
      console.info(`Successfully removed file with the path of ${filePath}`);
    }
  });
}

function padCRC32(input,text) {
  // Compute the CRC32 checksum
  const checksum = crc.crc32(input).toString(10); // Convert to base 10
  // Pad the checksum to 13 characters with leading zeros
  return checksum.padStart(13, text);
}


module.exports = {
  addfileBase64,
  addfile,
  removefile,
  padCRC32
} 