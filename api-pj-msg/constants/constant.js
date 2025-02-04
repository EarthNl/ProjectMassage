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
  
  const base64Data = file.split(";base64,").pop();
  const extension = getFileExtension(file)
  // Write the image file to disk
  fs.writeFile(`${filePath}.${extension}`, base64Data, { encoding: "base64" }, (err) => {
    if (err) {
      console.error(`Error saving image ${file.name}:`, err);
      return;
    }
    console.log(`Image saved: ${filePath}`);
  });
  return `${filePath}.${extension}`
}

function getFileExtension(base64Data) {
  const match = base64Data.match(/^data:(.+);base64,/);
  if (match && match[1]) {
    const ext = match[1].split("/")[1];
    let newExt = ext;
    if (ext === "jpeg") {
      return (newExt = "jpg");
    }
    return newExt;
  }
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
  if(text){
    return checksum.padStart(13,text);
  }
  return checksum.padStart(10,'0');
}




module.exports = {
  addfileBase64,
  addfile,
  removefile,
  padCRC32,
  getFileExtension
} 