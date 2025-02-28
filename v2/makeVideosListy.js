
// node makeVideosListy.js
import fs from 'fs';
import path from 'path';

// Use import.meta.url to get the current directory in ES module scope
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Specify the directory where your videos are located
const videosDir = path.join(__dirname, 'public', 'videos');

// Get all files in the directory
fs.readdir(videosDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter out non-video files (optional, depending on your needs)
  const videoFiles = files
    .filter(file => file.endsWith('.mp4')) // Adjust for other video types if needed
    .map(file => `${file}`);

  // Create an object to write to JSON
  
  const videoFilesJson = videoFiles;

  // Write the video files list to a JSON file
  fs.writeFile('videoFiles.json', JSON.stringify(videoFilesJson, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('Video files have been written to videoFiles.json');
  });
});
