
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

    button, .buuuton {
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    button:hover, .buuuton:hover {
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
  let showError = false; // Controls visibility
  let errorMessage = ""; // Stores the error message
  let showSuccess = false; // Stores the error message
  let successMessage = ""; // Stores the error message

  let status = "";
  const handleSubmit = async data => {
    status = 'Submitting...'
    const formData = new FormData(data.currentTarget)
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json
    });
    const result = await response.json();
    if (result.success) {
        console.log(result);
        showSuccess = true;
        successMessage = " SENT!!";
        status = result.message || "Success"
        status = '';
    }
    else{
      showError = true;
      errorMessage = "OH NO!!! Error some robot failed!!";
    }
  }


</script>


<div id="contact-form-a">


  <h2>Contact Robots</h2>

  <form on:submit|preventDefault={handleSubmit} id="contact-form">
    <div>{status}</div>

    {#if showError}
      <p id="error-message" class="response">{errorMessage}</p>
      {:else if showSuccess}
      <p id="success-message" class="response">{successMessage}</p>
    {/if}
    <input type="hidden" name="access_key" value="92dc55a6-487c-418d-b183-ae4cb1f68b48">

    <div class="group">
      <label for="name">Name</label>
      <input type="text" name="name" required />
    </div>

    <div class="group">
      <label for="email">Email</label>
      <input type="email" name="email" required />
    </div>

    <label for="message">Message</label>
    <textarea name="message" required rows="3"></textarea>
    <input class="buuuton" type="submit" />

    {#if showError}
      <p id="error-message" class="response">{errorMessage}</p>
      {:else if showSuccess}
      <p id="success-message" class="response">{successMessage}</p>
    {/if}

  </form>



</div>
