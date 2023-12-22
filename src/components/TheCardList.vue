<script setup>
	import TheCard from "./TheCard.vue";

	const onClickAdd = () => {
		alert("123");
	};
</script>

<template>
	<div class="grid grid-cols-4 gap-4">
		<TheCard
			title="Мужские кроссовки Nike Blazer Mid Suede"
			imageUrl="/sneakers/sneakers-1.jpg"
			:price="1205"
			:isFavorite="false"
			:onClickAdd="onClickAdd" />
	</div>
</template>

<style lang="scss" scoped></style>
