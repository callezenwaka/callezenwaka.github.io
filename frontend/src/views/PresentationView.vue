<template>
  <BreadCrumb></BreadCrumb>
  <!-- <div class="presentation"> -->
    <!-- <h1>Presentations</h1> -->
    <section class="presentation">
      <ul class="presentation--items">
      <li class="presentation--item" v-for="presentation in presentations" :key="presentation.id">
          <img class="presentation--avatar" :src="presentation.presentation" :alt="presentation.name" type="image/*" :title="presentation.name">
          <div class="presentation--summary">
					<h2 class="presentation--title">{{ presentation.name }}</h2>
          <p>{{ presentation.summary }}</p>
          <a :href="presentation.link" target="_blank">Event Website</a>
          </div>
				</li>
      </ul>
    </section>
  <!-- </div> -->
</template>

<script setup lang="ts">
import BreadCrumb from "@/components/partials/BreadCrumb.vue";
import datafestEvent from '@/assets/presentation/datafest/datafest.jpg';
import datafestPresentation from '@/assets/presentation/datafest/presentation.jpg';
import datafestSponsor from '@/assets/presentation/datafest/sponsor.jpg';
import { reactive } from 'vue';

const presentations = reactive([
	{
		id: 'datafest2022',
		name: 'Datafest Africa 2022',
		summary: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
    sponsor: datafestSponsor,
    presentation: datafestPresentation,
    event: datafestEvent,
    link: 'https://www.datafestafrica.com/',
	},
	{
		id: 'datafest2023',
		name: 'Datafest Africa 2023',
		summary: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
    sponsor: datafestSponsor,
    presentation: datafestPresentation,
    event: datafestEvent,
    link: 'https://www.datafestafrica.com/',
	},
]);
</script>

<style scoped lang="css">
.presentation {
  /* max-width: 960px; */
  margin: 0 auto;
  padding-top: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.presentation--items {
  display: flex;
    flex-direction: column;
    row-gap: 100px;
    list-style-type: none;
}
.presentation--item {
  display: flex;
  /* flex-direction: column; */
  /* justify-content: space-between; */
  align-items: flex-start;
  column-gap: 20px;
}
.presentation--item:nth-child(even) {
  flex-direction: row-reverse;
}
.presentation--avatar {
	width: 45%;
  width: calc(50% - 10px);
	height: auto;
	/* border-radius: 50%; */
}
.presentation--summary {
  width: calc(50% - 10px);
	text-align: justify;
	/* margin: 1.5rem 0rem; */
}
.presentation--title {
	text-align: center;
}

@media only screen and (min-width: 964px) {
	.presentation {
  max-width: 960px;
    margin: 0 auto;
  padding-top: 5rem;
    padding-left: 1rem;
  padding-right: 1rem;
}

	/* .summary {
		margin: 1.5rem 0rem;
	}

	.avatar {
		width: 20%;
		height: auto;
	} */

}

</style>