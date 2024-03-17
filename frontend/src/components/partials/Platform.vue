<template>
  <div class="platform">
		<h1 class="platform--title">Share</h1>
    <ul class="platform--items">
      <li class="platform--item" :title="linkedin.title">
        <a :href="linkedin.href" target="_blank"><Linkedin></Linkedin></a><!-- <component :is="platform.icon" /> -->
      </li>
      <li class="platform--item" :title="twitter.title">
        <a :href="twitter.href" target="_blank"><Twitter></Twitter></a><!-- <component :is="platform.icon" /> -->
      </li>
      <li class="platform--item" :title="facebook.title">
        <a :href="facebook.href" target="_blank"><Facebook></Facebook></a><!-- <component :is="platform.icon" /> -->
      </li>
    </ul>
		</div>
</template>

<script setup lang="ts">
import Linkedin from "@/components/icons/Linkedin.vue";
import Twitter from "@/components/icons/Twitter.vue";
import Facebook from "@/components/icons/Facebook.vue";
// import linkedinIcon from "@/assets/platforms/linkedin.svg";
// import twitterIcon from "@/assets/platforms/twitter.svg";
// import facebookcon from "@/assets/platforms/facebook.svg";
import { reactive, ref } from 'vue';

// interface Share {
//   url: string;
//   title: string;
//   summary: string;
// }

const props = defineProps<{
  // url: string;
  title: string;
  summary: string;
}>();

const shareUrl = ref(window.location.href);
// const shareTitle = ref(window.location.href);
// const shareSummary = ref(window.location.href);

const linkedin = reactive({
		id: 'linkedin',
		title: 'LinkedIn',
		// icon: Linkedin,
		href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl.value)}&title=${encodeURIComponent(props.title)}&summary=${encodeURIComponent(props.summary)}`,
    link: 'https://www.datafestafrica.com/',
	});

const twitter = reactive({
		id: 'twitter',
		title: 'Twitter',
		// icon: Twitter,
		href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(props.title)}`,
    link: 'https://www.datafestafrica.com/',
	});

	const facebook = reactive({
		id: 'facebook',
		title: 'Facebook',
		// icon: Facebook,
		href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl.value)}&quote=${encodeURIComponent(props.title)}`,
    link: 'https://www.datafestafrica.com/',
	});

</script>

<style scoped lang="css">
.platform {
	position: fixed;
	left: 0%;
	top: 25%;
}
.platform--title {
	font-size: 1rem !important;
}
.platform--items {
	list-style-type: none;
}
.platform--item {
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.platform--item:hover {
	transform: scale(1.2);
	opacity: 0.5;
}

@media only screen and (min-width: 964px) {
	.platform {
		position: fixed;
		left: 0%;
		top: 50%;
	}
}

</style>