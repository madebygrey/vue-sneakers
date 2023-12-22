<script setup>
	import TheCard from "./TheCard.vue";

	defineProps({
		items: Array,
	});
</script>

<template>
	<div class="grid grid-cols-4 gap-4">
		<TheCard
			v-for="item in items"
			:key="item.id"
			:title="item.title"
			:imageUrl="item.imageUrl"
			:price="item.price"
			:isFavorite="false" />
	</div>
</template>

<style lang="scss" scoped></style>
