<template>
  <BreadCrumb></BreadCrumb>
	<div class="home">
		<section class="heading">
			<h1 class="name">Callis Ezenwaka</h1>
			<img class="avatar" :src="callezenwaka" alt="Callis Ezenwaka" type="image/jpg" title="Callis Ezenwaka">
		</section>

		<section class="about">
			<p class="summary">
				I'm a scientist. I helped pioneer quantum computing and the
				modern open science movement. I also have a strong side
				interest in artificial intelligence. All are part of a broader
				interest in ideas and tools that help people think and create,
				both individually and
				collectively. [<!-- <a href="bio_michael_nielsen_06_2020.pdf">bio</a>, --> <a href="#">cv</a>]
			</p>

			<p class="summary">
				I work as a Research Fellow at the Astera Institute. Many of my research papers can be found <a href="#">here</a>.
			</p>

		</section>
		<section class="subscription">
			<p class="summary">
				My online notebook, including links to many of my recent and
				current projects, can be found <a href="#">here</a>.
			</p>
			<div class="content">
				<div class="tip" v-for="interest in interests" :key="interest.id">
					<span>{{ interest.name }}</span>
				</div>
			</div>
			<p class="summary">
				This is more up-to-date and complete than this webpage (which will
				eventually be deprecated). Want to hear about my blogs as they're released? <a href="#">Please join my mailing
					list below:</a>.
			</p>
			<form class="subscription--form" @submit.prevent="handleSubscription">
				<div class="subscribe--item">
					<label for="email" class="">
						<input type="email" class="subscribe--input" name="email" id="email" v-model="email"
							placeholder="john.doe@mail.com" aria-required="true" aria-invalid="false" autocomplete="email" required>
					</label>
				</div>
				<div class="subscribe--item">
					<button type="submit" class="subscribe--button">Subscribe</button>
				</div>
			</form>
		</section>
	</div>
</template>

<script setup lang="ts">
import callezenwaka from '@/assets/callezenwaka.jpg';
import BreadCrumb from "@/components/partials/BreadCrumb.vue";
import { ref, reactive } from 'vue';
// computed

const email = ref('');
const interests = reactive([
	{
		id: 'ai',
		name: 'AI Governance'
	},
	{
		id: 'wb',
		name: 'Wearable Biosensors'
	},
	{
		id: 'et',
		name: 'Emerging Technologies'
	},
	{
		id: 'dp',
		name: 'Data Privacy'
	},
	{
		id: 'es',
		name: 'Enterprise SaaS'
	},
]);

const handleSubscription = async () => {
	console.log('Subscribe: ', email.value);
};
</script>

<style scoped lang="css">
.home {
	padding: 1rem 1rem;
}

.heading {
	/* margin: 1rem; */
	display: flex;
	gap: 5%;
	align-content: center;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
}

.name {
	width: 75%;
	font-family: monospace;
	font-size: 1.75rem;
}

.avatar {
	width: 20%;
	height: auto;
	border-radius: 50%;
}

.avatar:hover {
	filter: drop-shadow(0 0 1.5rem var(--drop-shadow-primary));
}

.about {
	text-align: justify;
}

.summary {
	text-align: justify;
	margin: 1.5rem 0rem;
}

/* content */
.content {
	position: relative;
	max-width: 700px;
	padding-left: 0;
	padding-left: 1rem;
}

.content div.tip {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 1rem;
	padding: 0.3rem 1rem;
	border-left-width: 4px;
	border-left-style: solid;
	border-left-color: var(--background-color-primary);
	position: relative;
	border-bottom-right-radius: 2px;
	border-top-right-radius: 2px;
}

.content div {
	line-height: 1.6em;
	padding-bottom: 1.2em;
	position: relative;
	z-index: 1;
}

.content div.tip:before {
	position: absolute;
	top: 14px;
	left: -12px;
	color: #fff;
	width: 20px;
	height: 20px;
	border-radius: 100%;
	text-align: center;
	line-height: 20px;
	font-weight: bold;
	font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
	content: "\273A";
	background-color: #af9d6f;
	background-color: var(--background-color-primary);
}

/* subscription */
.subscription {
	margin-top: 5rem;
	/* margin-bottom: 5rem; */
}

.subscription--form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.subscribe--item {
	display: block;
	margin: .5rem 0;
	border-radius: 5px;
	width: 100%;
	position: relative;
	text-align: left;
}

.subscribe--input {
	background-color: var(--background-color-tertiary);
	color: var(--text-primary-color);
	border: solid;
	padding: 0.5rem 1rem;
	font-size: inherit;
	-webkit-border-radius: 0;
	border-radius: 0.5rem;
	-webkit-box-shadow: none;
	box-shadow: none;
	-webkit-transform: scale(1);
	transform: scale(1);
	transition: all 0.2s linear;
	width: 100%;
}

.subscribe--button {
	background-color: var(--button-primary-color);
	color: var(--text-primary-color);
	border: none;
	border: 0.1rem solid var(--text-primary-color);
	border-radius: 0.5rem;
	text-align: center;
	font-size: inherit;
	width: 100%;
	padding: 0.5rem 1rem;
	cursor: pointer;
	transition: all 1s ease-out;
}

.subscribe--button:hover {
	filter: drop-shadow(0 0 1.5rem var(--drop-shadow-primary));
}



@media only screen and (min-width: 480px) {
	.name {
		width: 75%;
		font-family: monospace;
		font-size: 5rem;
	}

	.avatar {
		width: 40%;
		height: auto;
	}

	.subscription--form {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
}

@media only screen and (min-width: 964px) {
	.home {
		max-width: 960px;
		margin: 0 auto;
		padding-left: 1rem;
  padding-right: 1rem;
	}

	.summary {
		margin: 1.5rem 0rem;
	}

	.avatar {
		width: 20%;
		height: auto;
	}

}

</style>