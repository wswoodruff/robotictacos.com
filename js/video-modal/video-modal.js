// Function to open the modal and load the video
export function openVideo(videoSrc) {
  const modal = document.getElementById('video-modal');
  const videoPlayer = document.getElementById('video-player');

  videoPlayer.src = videoSrc; // Set the video source
  modal.classList.remove('hidden'); // Show the modal
}

// Function to close the modal
export function closeVideo(event) {
  const modal = document.getElementById('video-modal');
  const videoPlayer = document.getElementById('video-player');

  // Close only if clicking outside the video container or close button
  if (!event || event.target === modal || event.target.classList.contains('close-button')) {
    videoPlayer.pause(); // Pause the video
    videoPlayer.src = ''; // Reset the video source
    modal.classList.add('hidden'); // Hide the modal
  }
}
