<script setup>
	import TheCard from "./TheCard.vue";

	defineProps({
		items: Array,
		isFavorites: Boolean,
	});

	const emit = defineEmits(["addToFavourite", "addToCart"]);
</script>

<template>
	<div class="grid grid-cols-4 gap-4" v-auto-animate>
		<TheCard
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:title="item.title"
			:imageUrl="item.imageUrl"
			:price="item.price"
			:isFavorite="item.isFavorite"
			:isAdded="item.isAdded"
			:onClickFavorite="isFavorites ? null : () => emit('addToFavourite', item)"
			:onClickAdd="isFavorites ? null : () => emit('addToCart', item)" />
	</div>
</template>

<style lang="scss" scoped></style>
