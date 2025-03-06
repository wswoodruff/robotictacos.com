


<style>
  #joystickcontroller {
/*    position: absolute;*/
    z-index: 10;
/*    right: 1em;*/
/*    bottom: 1em;*/
    --size: 10em;
    width: var(--size);
    height: var(--size);
  }

  .border {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: solid 2px white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stick {
    position: absolute;
    --size: 2em;
    width: var(--size);
    height: var(--size);
    background: white;
    border-radius: 50%;
    transform: translate(0, 0);
/*    transition: transform 0.1s ease-out;*/
    transition: transform 0.05s;
    z-index: 10;
  }
  
  .center {
    position: absolute;
    --size: 0.6em;
    width: var(--size);
    height: var(--size);
    background: #444;
    border-radius: 50%;
    z-index: 9;
    display: none;
  }
</style>



<script>
	import { onMount } from "svelte";

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let stick, border;
	let radius;
	let stickRadius;
	let position = { x: 0, y: 0 };
	let normalized = { x: 0, y: 0 };
	let borderRect;
	let IS_DOWN = false;
	let clientX, clientY;

	function updateStick() {
		
		// const rect = border.getBoundingClientRect();
		const centerX = borderRect.left + radius;
		const centerY = borderRect.top + radius;

		let dx = clientX - centerX;
		let dy = clientY - centerY;

		let distance = Math.sqrt(dx * dx + dy * dy);
		// let maxDistance = radius - stickRadius;
		let maxDistance = radius;

		if (distance > maxDistance) {
		  let angle = Math.atan2(dy, dx);
		  dx = Math.cos(angle) * maxDistance;
		  dy = Math.sin(angle) * maxDistance;
		}

		position.x = dx;
		position.y = dy;

		stick.style.transform = `translate(${dx}px, ${dy}px)`;
		// console.log("position", position);

		normalized.x = dx / maxDistance;
		normalized.y = -dy / maxDistance;

		// console.log("normalized", normalized);
		// dispatchEvent(new CustomEvent("joystickmove", { 
			// detail: { x: normalized.x, y: normalized.y } }));
		// dispatch("joystickmove", { 
		// 	detail: { x: normalized.x, y: normalized.y } 
		// });
		dispatch("joystickmove", { 
			position: { x: normalized.x, y: normalized.y } 
		});
	}

	function resetStick() {
		position.x = 0;
		position.y = 0;
		stick.style.transform = "translate(0, 0)";
		// dispatchEvent(new CustomEvent("joystickmove", { detail: { x: 0, y: 0 } }));
		dispatch("joystickmove", { 
			position: { x: position.x, y: position.y } 
		});
	}

	function getCoords(event) {

		if (event.touches) {
		  clientX = event.touches[0].clientX;
		  clientY = event.touches[0].clientY;
		} else {
		  clientX = event.clientX;
		  clientY = event.clientY;
		}
	}

	function handleDown(ev){
		ev.preventDefault();
		IS_DOWN = true;
		getCoords(ev);
	}
	function handleUp(ev) {
		ev.preventDefault();
		IS_DOWN = false;
		resetStick();
	}
	function handleMove(ev) {
		if(!IS_DOWN) return;
		getCoords(ev);
		updateStick();
	}

	onMount(() => {

		borderRect = border.getBoundingClientRect();
		console.log("borderRect", borderRect);

		let size = 14 * 16; // 14em in pixels
		radius = borderRect.height / 2;
		stickRadius = radius / 2;



		border.addEventListener("mousedown", handleDown);
		border.addEventListener("touchstart", handleDown);

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("touchmove", handleMove);

		document.addEventListener("mouseup", handleUp);
		document.addEventListener("touchend", handleUp);
	});
</script>

<div id="joystickcontroller" bind:this={border}>
  <div class="border">
    <div class="stick" bind:this={stick}></div>
    <div class="center"></div>
  </div>
</div>


