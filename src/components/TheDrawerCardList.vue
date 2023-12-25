<script setup>
	import { inject } from "vue";
	import TheDrawerCard from "./TheDrawerCard.vue";

	const { cart, removeFromCart } = inject("cart");
</script>

<template>
	<div class="flex flex-col flex-1 gap-4">
		<TheDrawerCard
			v-for="item in cart"
			:key="item.id"
			:title="item.title"
			:price="item.price"
			:imageUrl="item.imageUrl"
			@on-click-remove="removeFromCart(item)" />
	</div>
</template>

<style lang="scss" scoped></style>
