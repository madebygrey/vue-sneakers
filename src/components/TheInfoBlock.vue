<script setup>
	defineProps({
		title: String,
		desc: String,
		imageUrl: String,
	});
</script>

<template>
	<div class="flex flex-col items-center text-center w-72 mx-auto my-auto">
		<img :src="imageUrl" alt="" width="80" height="80" />
		<h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
		<p class="text-gray-400 mt-2">{{ desc }}</p>
	</div>
</template>

<style scoped></style>
