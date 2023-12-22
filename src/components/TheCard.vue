<script setup>
	defineProps({
		title: String,
		imageUrl: String,
		price: Number,
		isFavorite: Boolean,
		isAdded: Boolean,
		onClickAdd: Function,
		onClickFavorite: Function,
	});
</script>

<template>
	<div>
		<div
			class="relative bg-white border border-slate-1000 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
			<img
				@click="onClickFavorite"
				:src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
				class="absolute top-8 left-8"
				alt="like" />
			<img :src="imageUrl" alt="Sneaker" />
			<p class="mt-2">{{ title }}</p>
			<div class="flex justify-between mt-5">
				<div class="flex flex-col">
					<span class="text-slate-400">Цена:</span>
					<b>{{ price }} руб.</b>
				</div>

				<img
					@click="onClickAdd"
					:src="!isAdded ? '/plus.svg' : '/checked.svg'"
					alt="plus" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
