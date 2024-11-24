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



export function openImage(src) {
  const modal = document.getElementById('image-modal');
  const player = document.getElementById('image-player');

  player.src = src; // Set the video source
  modal.classList.remove('hidden'); // Show the modal
}

// Function to close the modal
export function closeImage(event) {
  const modal = document.getElementById('image-modal');
  const player = document.getElementById('image-player');

  // Close only if clicking outside the video container or close button
  if (!event || event.target === modal || event.target.classList.contains('close-button')) {
    player.src = ''; // Reset the video source
    modal.classList.add('hidden'); // Hide the modal
  }
}


/*
needs this in the dom
dont feel like wrating a script
oh! chappy automation!!

*/
// Call the function to create and append the modal
// createVideoModal();

export function createVideoModal() {
  // Define the modal structure as a string literal
  const modalHTML = `
    <div id="video-modal" class="modal hidden">
      <div class="video-container">
        <video id="video-player" controls></video>
        <button class="close-button">×</button>
      </div>
    </div>
  `;

  // Insert the modal into the DOM by appending it to the body
  document.body.insertAdjacentHTML('beforeend', modalHTML);


  // Programmatically assign the onclick handlers
  const modal = document.getElementById('video-modal');
  const closeButton = modal.querySelector('.close-button');

  // Close modal when clicking outside the image container or on the close button
  modal.addEventListener('click', closeVideo);
  closeButton.addEventListener('click', closeVideo);


}

export function createImageModal() {
  // Define the modal structure as a string literal
  const modalHTML = `
  <div id="image-modal" class="modal hidden">
    <div class="image-container">
      <img id="image-player" alt="" src="">
      <button class="close-button">×</button>
    </div>
  </div>
  `;

  // Insert the modal into the DOM by appending it to the body
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Programmatically assign the onclick handlers
  const modal = document.getElementById('image-modal');
  const closeButton = modal.querySelector('.close-button');

  // Close modal when clicking outside the image container or on the close button
  modal.addEventListener('click', closeImage);
  closeButton.addEventListener('click', closeImage);

}



export function createModals(){
  createVideoModal();
  createImageModal();
}



export function bindModalDatas(){

  const videos = document.querySelectorAll('video');
  // debugger
  // videos[4].querySelector('source').src
  for (let i = 0; i < videos.length-1; i++) {
    const vvv = videos[i].querySelector('source');
    // console.log(vvv.src);
    if (vvv.src) {
      videos[i].addEventListener('click', function(ev) {
        console.log("src", vvv.src);
        openVideo(vvv.src)
      })
    }
  }

  const portimages = document.querySelectorAll('[data-portimg]');
  console.log("portimages", portimages);
  for (let i = 0; i < portimages.length; i++) {
    // const vvv = videos[i].querySelector('source');
    console.log(portimages[i].src);
    if (portimages[i].src) {
      portimages[i].addEventListener('click', function(ev) {
        console.log("src", portimages[i].src);
        openImage(portimages[i].src)
      })
    }
  }
  // debugger


}
