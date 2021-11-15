<template>
  <div class="projects">
    <div class="image--items">
      <div class="image--item">
        <div class="image--focus">
          <img :src="image.url" :alt="image.name" width="100%" height="auto">
          <p>{{image.name}}</p>
          <p style="text-align: left;">{{projects.description}}</p>
          <p style="text-align: left;">Project Page: <a style="color: #fff;" :href="projects.url" target="_blank">{{projects.name}}</a></p>
        </div>
        <ul class="image--lists">
          <li class="image--list" v-for="(image, index) in projects.images" :key="image.id" @click="setImage(index)">
            <img :src="image.url" :alt="image.name" width="100%" height="auto">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Project",
  props: { projects: { default: () => ({}), type: Object } },
  data: function () {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    image() {
      return this.projects.images.find(
        (image, index) => index === this.currentIndex
      );
    },
  },
  methods: {
    setImage(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.projects {
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: #ffffff;
  background-color: #051725;
  background-color: #000000;
  /* background-image: url(https://storage.googleapis.com/motionstreak.appspot.com/network_nodes.png); */
  background-position: bottom right;
  background-repeat: repeat;
}
/* .projects:nth-child(even) {
  background-color: #f4f4f4;
} */
.image--item {
  display: flex;
  width: 100%;
}
.image--focus {
  width: 80%;
}
.image--focus:nth-child(odd) {
  margin-right: 0.5rem;
}
.image--focus:nth-child(even) {
  margin-left: 0.5rem;
}
.image--lists {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style-type: none;
  width: 20%;
  padding: 0;
  margin-top: 0;
}
.image--list {
  cursor: pointer;
}
/* mini screen */
@media screen and (min-width: 981px) {
  .image--items {
    width: 50%;
    margin: 0 auto;
  }
}
/* Wider screen */
@media screen and (min-width: 981px) {
  .image--items {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
