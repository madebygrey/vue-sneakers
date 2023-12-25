<script setup>
	defineProps({
		id: Number,
		title: String,
		imageUrl: String,
		price: Number,
	});
	const emit = defineEmits(["onClickRemove"]);
</script>

<template>
	<div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
		<img :src="imageUrl" class="w-16 h-16" :alt="title" />
		<div class="flex flex-col w-full">
			<p>{{ title }}</p>
			<div class="flex justify-between mt-2 w-full items-center">
				<b>{{ price }} руб.</b>
				<img
					@click="emit('onClickRemove')"
					class="opacity-40 hover:opacity-100 cursor-pointer transition"
					src="/close.svg"
					alt="" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
