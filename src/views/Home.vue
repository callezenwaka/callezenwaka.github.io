<template>
  <div class="home">
    <div class="header">
      <router-link class="link" to="/">Callis Ezenwaka</router-link>
    </div>
    <div class="about">
      <div class="about--wrapper">
        <h1>Hi, I'm Callis 👋🏾</h1>

        <p>Glad that you came around. I am a Senior Software Engineer 👨🏿‍💻.</p>

        <p>I have 6+ years of experience writing codes. My tech stack is majorly on JavaScript including Node.js, Vue.js, TypeScript, and React.js</p>

        <p>I have practical experience with, RESTful APIs and GraphQL integrations, databases (sql & noSql) and cloud platforms (AWS, GCP, Azure)</p>

        <p>I am passionate about delivering products and services that are scalable, affordable, reliable and user friendly.</p>

        <p>My <a href="https://codepen.io/callezenwaka">Codepen</a> page has awesome demos. So are other demos on <a href="https://github.com/callezenwaka">github</a></p>

        <p>Some of my projects are below:</p>

        <p><a href="https://www.algoboard.com">Algoboard</a> - An EdTech platform that supported schools during the COVID-19 lockdown. I am currently pivoting the platform.</p>

        <p><a href="https://www.algoforms.com">Algoforms</a> - An low code platform for organization that collect data in remote regions. It is an offline first application with background sync embedded.</p>

        <p>Want more? Visit <a href="https://www.callisezenwaka.com">callisezenwaka.com</a> or send an email to <a href="mailto:callisezenwaka@outlook.com">callisezenwaka@outlook.com</a> | <a href="mailto:callisezenwaka@barewave.com">callisezenwaka@barewave.com</a></p>
      </div>
    </div>
    <Project :projects="project1"></Project>
    <Project :projects="project2"></Project>
    <Project :projects="project3"></Project>
    <Project :projects="project4"></Project>
    <Project :projects="project5"></Project>
    <div class="wave">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
    <footer class="footer">
      <span>Callezenwaka © {{ new Date().getFullYear() }}</span>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Project from "@/components/Project.vue";
export default {
  name: "Home",
  components: {
    Project,
  },
  data() {
    return {
      project1: {
        url: "https://algoboard.com",
        name: "Algoboard",
        description:
          "Algoboard is an EdTech SaaS application and doubles as a learning platform and School Management System.",
        images: [
          {
            id: 1,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoboard/account.PNG",
            name: "Account",
            focus: true,
          },
          {
            id: 2,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoboard/dashboard.PNG",
            name: "Dashboard",
            focus: false,
          },
          {
            id: 3,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoboard/documentation.PNG",
            name: "Documentation",
            focus: false,
          },
          {
            id: 4,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoboard/exams.PNG",
            name: "Exams",
            focus: false,
          },
          {
            id: 5,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoboard/home.PNG",
            name: "Home",
            focus: false,
          },
          {
            id: 6,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoboard/schedule.PNG",
            name: "Schedule",
            focus: false,
          },
        ],
      },
      project2: {
        url: "https://algoforms.com",
        name: "Algoforms",
        description:
          "Algoforms is a low-code online data application suitable for gathering data from remote areas",
        images: [
          {
            id: 1,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoform/home.PNG",
            name: "Home",
            focus: false,
          },
          {
            id: 2,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoform/dashboard.PNG",
            name: "Dashboard",
            focus: false,
          },
          {
            id: 3,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoform/documentation.PNG",
            name: "Documentation",
            focus: false,
          },
          {
            id: 4,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoform/form.PNG",
            name: "Form",
            focus: false,
          },
          {
            id: 5,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoform/account.PNG",
            name: "Account",
            focus: true,
          },
          {
            id: 6,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/algoform/insight.PNG",
            name: "Insight",
            focus: false,
          },
        ],
      },
      project3: {
        url: "https://genomestream.web.app/",
        name: "Gene Sequence Package",
        description:
          "Genesequence package is a light-weight bioinformatics python library.",
        images: [
          {
            id: 1,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/genesequence/app.PNG",
            name: "Application",
            focus: true,
          },
          {
            id: 2,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/genesequence/cli.PNG",
            name: "CLI",
            focus: false,
          },
          {
            id: 3,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/genesequence/doc.PNG",
            name: "Documetation",
            focus: false,
          },
          {
            id: 4,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/genesequence/gui.PNG",
            name: "GUI",
            focus: false,
          },
          {
            id: 5,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/genesequence/hero.PNG",
            name: "Home",
            focus: false,
          },
          {
            id: 6,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/genesequence/subscribe.PNG",
            name: "Subscription",
            focus: false,
          },
        ],
      },
      project4: {
        url: "https://fullstack-nft.netlify.app/",
        name: "NFT Marketplace",
        description:
          "NFT marketplace is a platform for trading NFT.",
        images: [
          {
            id: 1,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/nft/Home%20page.png",
            name: "Home",
            focus: true,
          },
          {
            id: 2,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/nft/Login%20page.png",
            name: "Login",
            focus: false,
          },
          {
            id: 3,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/nft/Logout%20dropdown.png",
            name: "Logout Dropdown",
            focus: false,
          },
          {
            id: 4,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/nft/User325%20asset.png",
            name: "User1 Asset",
            focus: false,
          },
          {
            id: 5,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/nft/User325%20sales.png",
            name: "User1 Sales",
            focus: false,
          },
          {
            id: 6,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/nft/User48f%20assets.png",
            name: "User2 Assets",
            focus: false,
          },
          {
            id: 7,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/nft/User48f%20nft.png",
            name: "User2 NFT",
            focus: false,
          },
          {
            id: 8,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/nft/mobile%20view1.png",
            name: "Mobile View1",
            focus: false,
          }
        ],
      },
      project5: {
        url: "https://onevault.web.app/",
        name: "Onevault",
        description:
          "Onevault is a web3-based blockchain file sharing platform.",
        images: [
          {
            id: 1,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/onevault/Home%20Page.png",
            name: "Home Page",
            focus: false,
          },
          {
            id: 2,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/onevault/Admin%20Document%20Page.png",
            name: "Admin Document Page",
            focus: true,
          },
          {
            id: 3,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/onevault/Fetch%20Account%20Page.png",
            name: "Fetch Account Page",
            focus: false,
          },
          {
            id: 4,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/onevault/Profile%20Page.png",
            name: "Profile Page",
            focus: false,
          },
          {
            id: 5,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/onevault/Tenant%20Document%20Page.png",
            name: "Tenant Document Page",
            focus: false,
          },
          {
            id: 6,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/onevault/Tenant%20Service%20Page.png",
            name: "Tenant Service Page",
            focus: false,
          },
          {
            id: 7,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/onevault/Mobile%20Home%20Page.png",
            name: "Mobile Home Page",
            focus: false,
          },
          {
            id: 8,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/onevault/Mobile%20Document%20View.png",
            name: "Mobile Document View",
            focus: false,
          },
          {
            id: 9,
            url: "https://storage.googleapis.com/barewave-464b5.appspot.com/onevault/Mobile%20Responsive%20Side%20Menu.png",
            name: "Mobile Responsive Side Menu",
            focus: false,
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
body {
  display: block;
  margin: 0px;
}
.header {
  background-color: #000000;
  display: flex;
  /* padding-left: 20%; */
  padding-top: 1rem;
  padding-bottom: 1rem;
  min-height: 60px;
}
.logo {
  width: 3rem;
  height: 3rem;
}
.link {
  align-self: center;
  margin-left: 3rem;
  color: #ffffff;
  text-decoration: none;
  font-size: x-large;
}
.page--header {
  text-align: left;
  color: #ffffff;
  background-color: #000000;
}
.page--header p {
  padding: 0% 0.5rem;
  margin: 0%;
}
.about {
  background-color: #000000;
  background-image: url(https://storage.googleapis.com/barewave-464b5.appspot.com/barewave/network_nodes.png);
  background-position: bottom right;
  background-repeat: repeat;
}
.about--wrapper {
  text-align: left;
  padding: 2rem 1rem;
  color: #ffffff;
}

/* wave */
.waves {
  position: relative;
  background-color: #000000;
  width: 100%;
  height: 100vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}
/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
.footer {
  width: 100%;
  font-size: 80%;
  text-align: center;
  padding: 2rem 0;
  /* color: #ffffff; */
}
/* mini screen */
@media screen and (min-width: 981px) {
  .header {
    background-color: #000000;
    display: flex;
    padding-left: 20%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    min-height: 60px;
  }
  .about--wrapper {
    width: 700px;
    margin: 0 auto;
  }
  .image--items {
    width: 50%;
    margin: 0 auto;
  }
}
</style>