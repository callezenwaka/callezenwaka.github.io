<template>
  <div class="about">
    <div class="header">
      <router-link class="link" to="/">Callis Ezenwaka</router-link>
      <router-link class="link" to="/about">About Me</router-link>
    </div>
    <div class="about--wrapper">
      <h1>Hi, I'm Callis 👋🏾</h1>

      <p>Glad that you came around. I am a Software Engineer 👨🏿‍💻 turned Program Manager, I still write codes anyway.</p>

      <p>I also research on Privacy for Emerging Technology and Enterprise Cloud Applications.</p>

      <p>My <a href="https://codepen.io/callezenwaka">Codepen</a> page has awesome demos.</p>

      <p>My personal projects are centered around giving back to the community.</p>

      <p>You can check them out below:</p>

      <p><a href="https://www.algoboard.com">Algoboard</a> - An EdTech platform that supported schools during the COVID-19 lockdown. I am currently pivoting the platform.</p>

      <p><a href="https://www.algoforms.com">Algoforms</a> - An low code platform for organization that collect data in remote regions. It is an offline first application with background sync embedded.</p>

      <p>Want to learn more about me? Check out my website <a href="https://www.callisezenwaka.com">callisezenwaka.com</a> or send an email to <a href="mailto:callisezenwaka@outlook.com">callisezenwaka@outlook.com</a></p>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: #000000;
  display: flex;
  /* padding-left: 20%; */
  padding-top: 1rem;
  padding-bottom: 1rem;
  min-height: 60px;
}
.about--wrapper {
  text-align: left;
  padding: 2rem 1rem;
}
.link {
  align-self: center;
  margin-left: 3rem;
  color: #ffffff;
  text-decoration: none;
  font-size: x-large;
}
@media only screen and (min-width: 981px) {
  .about--wrapper {
    width: 700px;
    margin: 0 auto;
  }
  .header {
    background-color: #000000;
    display: flex;
    padding-left: 20%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    min-height: 60px;
  }
}
</style>