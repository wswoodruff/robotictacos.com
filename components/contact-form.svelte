
<style lang="scss">

  #contact-form-a {
    /* font-family: Arial, sans-serif; */
    /* background-color: #f9f9f9; */
    color: #333;
    margin: 0;
    padding: 0;
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    /* min-height: 100vh; */
    padding: 2em 0;

    h2 {
      /* text-align: center; */
      color: #444;
    }

    /* form {
      background: #ffffff;
      padding: 20px 30px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
    } */
    form {
      background: #ffffff;
      padding: 2em 2em;
      /* border-radius: 8px; */
      /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
      /* border: solid 12px black; */
      width: 100%;
    }

    label {
      font-weight: bold;
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      color: #555;
    }

    input, textarea, button {
      width: 100%;
      padding: 0.8em;
      margin-bottom: 0.2em;
      border: 1px solid #ddd;
      border-radius: 5px;
      /* ios will force zoom if below 16px */
      font-size: 16px;
    }

    input{
      border: none;
      border-bottom: solid 1px #ccc;
      border-radius:initial;
    }

    input:focus, textarea:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    }

    .group{
      margin-bottom: 1em;
      display: flex;
      align-items: flex-end;
      label{
        margin-right: 0.5em;
        /* margin-bottom: -4px; */
      }
    }

    textarea {
      resize: none;
      height: 100px;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }

    .response{
      padding: 1em;
      z-index: 1;
      margin-top: 15px;
      font-weight: 600;

    }
    #error-message {
      /* text-align: center; */
      /* font-size: 14px; */
      color: white;
      font-weight: 900;
      background: red;
    }

    #success-message {
      /* text-align: center; */
      /* font-size: 14px; */
      color: black;
      font-weight: 600;
      margin-top: 15px;
      /* background: orange; */
      background: yellow;
      border: solid 2px blue;
      padding: 1em;
      z-index: 1;
    }

  }

  /* @media (max-width: 600px) {
    form {
      padding: 15px 20px;
    }
    input, textarea, button {
      font-size: 13px;
    }
  } */

</style>

<script>
  // document.getElementById("contact-form").addEventListener("submit", async (event) => {
  //   event.preventDefault();

  let name = "";
  let email = "";
  let message = "";
  let showError = false; // Controls visibility
  let errorMessage = ""; // Stores the error message
  let showSuccess = false; // Stores the error message
  let successMessage = ""; // Stores the error message

  async function send(ev) {

      ev.preventDefault();

      // const name = document.getElementById("name").value;
      // const email = document.getElementById("email").value;
      // const message = document.getElementById("message").value;

      console.log(name, email, message);

      try {
        // const response = await fetch("http://localhost:3000/contact", {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access_key": "dec5f887-d3a3-4922-988e-de93891b0c80",
            Accept: "application/json"
          },
          body: JSON.stringify({ name, email, message }),
        });

        // const formData = new FormData(ev.target);
        //
        // formData.append("access_key", "dec5f887-d3a3-4922-988e-de93891b0c80");
        //
        // const response = await fetch("https://api.web3forms.com/submit", {
        //   method: "POST",
        //   body: formData
        // });

        const data = await response.json();

        if (response.ok) {
          showSuccess = true;
          successMessage = " SENT!!";
          document.getElementById("response-message").textContent = data.message;
        } else {
          showError = true;
          errorMessage = "OH NO!!! Error some robot failed!!";
          // document.getElementById("response-message").textContent = data.error;
        }
      } catch (error) {
        showError = true;
        errorMessage = "OH NO!!! Error some robot failed!!";
        console.error("Error submitting the form:", error);
        // document.getElementById("response-message").textContent = "An error occurred.";
      }

  }

</script>


<div id="contact-form-a">


  <h2>Contact Robots</h2>
  <form id="contact-form">
    <!-- <p id="success-message" class="response">{successMessage}</p> -->
    {#if showError}
      <p id="error-message" class="response">{errorMessage}</p>
      {:else if showSuccess}
      <p id="success-message" class="response">{successMessage}</p>
    {/if}
    <div class="group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" bind:value={name} required>
    </div>
    <div class="group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" bind:value={email} required>
    </div>
    <label for="message">Message</label>
    <textarea id="message" name="message" bind:value={message} required></textarea>
    <button type="submit" on:click={send}>Submit</button>

    <!-- <p id="response-message">sglkndfgjn</p> -->
    <!-- <p id="response-message"></p> -->
    {#if showError}
      <p id="error-message" class="response">{errorMessage}</p>
      {:else if showSuccess}
      <p id="success-message" class="response">{successMessage}</p>
    {/if}
    <!-- <p id="success-message" class="response">"slkdfnsf"</p> -->

  </form>


</div>
