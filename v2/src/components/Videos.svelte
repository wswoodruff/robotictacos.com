

<script>
  // Import all video files from a directory
  // const videos = import.meta.glob('/videos/*.mp4', { eager: true });

  // Convert object keys to an array of URLs
  // const videoFiles = Object.values(videos).map(v => v.default);
  // let videoFiles = [];

let videoFiles = [
  "32north_bumpe.mp4",
  "3dthing1.mp4",
  "arbrid1b.mp4",
  "arshoe1.mp4",
  "atractor1.mp4",
  "ball1.mp4",
  "ball1vr2.mp4",
  "bill_ui_vid_grlb82JEw5mV7_OC.mp4",
  "candystar.mp4",
  "circles_a.mp4",
  "cocoon.mp4",
  "colors1.mp4",
  "cubes_a.mp4",
  "dino.mp4",
  "gamegrid1.mp4",
  "gistify_production.mp4",
  "infinigame1.mp4",
  "iphone1.mp4",
  "kindaai.mp4",
  "ldub2.mp4",
  "news1.mp4",
  "notgolf.mp4",
  "shaders1.mp4",
  "spacepupets.mp4",
  "starpower.mp4",
  "straighttalk.mp4",
  "treesdups.mp4",
  "trixel.mp4",
  "vr1.mp4",
  "vr4.mp4",
  "vrcandy1.mp4",
  "vrcity.mp4",
  "vrfilterness.mp4",
  "vrhand234.mp4",
  "vrheart.mp4",
  "vrkelp.mp4",
  "vrmultihands.mp4",
  "vrtalk.mp4",
  "wexar.mp4",
  "wexar_b.mp4",
  "wuirst.mp4"
]


function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap arr[i] with arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


videoFiles = shuffleArray(videoFiles);





// 
// 
// 

 let isInViewport = false;
  let videoSrc = ''; // Video source, initially empty.



  // Use the IntersectionObserver to track when the video enters the viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("Lndfjdfgkjfdn")
        // If the video is in the viewport, load the video.
        isInViewport = true;
        videoSrc = entry.target.dataset.src; // Fetch the video source from the data attribute.
      }
    });
  });



 // Start observing the video element when the component is mounted.
  import { onMount } from 'svelte';
  onMount(() => {
    observer.observe(document.querySelector('.lazy-video'));
  });


 // Cleanup the observer when the component is destroyed.
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    observer.disconnect();
  });



</script>


<style>
  .boxy{
    padding-top: 2em;
    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 0;
  }
/* Mobile: Force 2 columns when screen width is small */
@media (max-width: 480px) { /* Adjust for iPhone screen sizes */
  .boxy {
    grid-template-columns: repeat(2, 1fr);
  }
}
  .video-container {
/*    margin: 10px;*/
/*float: left;*/
margin: 0;
padding: 0;
margin-bottom: -10px;
  }
  video {
    width: 100%;
/*    max-width: 300px;*/
    margin: 0;
padding: 0;
height: calc(100px + 100px * random());

  }
</style>


<div class="boxy">
  <!-- <h2>videos</h2> -->
  {#each videoFiles as videoSrc}
    <!-- <div class="video-container"> -->
      <!-- <video src=./videos/{videoSrc} autoplay muted loop playsinline></video> -->
 <video class="lazy-video" data-src=./videos{videoSrc} preload="none" autoplay loop muted playsinline>
    {#if isInViewport}
      <source src=./videos/{videoSrc} type="video/mp4" />
    {/if}
  </video>
 
    <!-- </div> -->
  {/each}
</div>
