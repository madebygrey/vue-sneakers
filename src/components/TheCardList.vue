<script setup>
	import TheCard from "./TheCard.vue";

	defineProps({
		items: Array,
	});

	const emit = defineEmits(["addToFavourite"]);
</script>

<template>
	<div class="grid grid-cols-4 gap-4">
		<TheCard
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:title="item.title"
			:imageUrl="item.imageUrl"
			:price="item.price"
			:isFavorite="item.isFavorite"
			:onClickFavorite="() => emit('addToFavourite', item)" />
	</div>
</template>

<style lang="scss" scoped></style>
