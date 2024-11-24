
// Note this file is hard coded to the names in the html file for now


let selected = "dragon"; // dragon, bill

function toggle(ev) {
  if (selected === "dragon") {
    selected = "bill";

    aa.classList.remove('bio-unselected');
    bb.classList.add('bio-unselected');
  }
  else if (selected === "bill") {
    selected = "dragon";
  }
  console.log("selected", selected);
}

function selectName(name) {
  selected = name;
  console.log("selected", selected);
  const aa = document.getElementById('content-nick');
  const aa2 = document.querySelector('#crew-dragon button');
  const bb = document.getElementById('content-bill');
  const bb2 = document.querySelector('#crew-bill button');


  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  })
  if (selected === "dragon") {
    aa.classList.remove('bio-unselected');
    bb.classList.add('bio-unselected');
    bb2.classList.remove('selected');
    aa2.classList.add('selected');
  }
  else if (selected === "bill") {
    aa.classList.add('bio-unselected');
    bb.classList.remove('bio-unselected');
    aa2.classList.remove('selected');
    bb2.classList.add('selected');
  }
}


// Get URL parameter value by key
function getURLParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}


export function buildtoggles() {
  const toggle0 = document.querySelector('#spacecrew #crew-dragon button');
  toggle0.addEventListener('click', function(ev) {
    console.log("evvvv", ev);
    // toggle(ev);
    selectName("dragon");
  });
  const toggle1 = document.querySelector('#spacecrew #crew-bill button');
  toggle1.addEventListener('click', function(ev) {
    console.log("evvvv", ev);
    // toggle(ev);
    selectName("bill");
  });
}
