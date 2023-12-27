<script setup>
	import { onMounted, ref } from "vue";
	import axios from "axios";

	import TheCardList from "../components/TheCardList.vue";

	const favorites = ref([]);

	onMounted(async () => {
		try {
			const { data } = await axios.get(
				"https://604781a0efa572c1.mokky.dev/favorites?_relations=items"
			);
			favorites.value = data.filter((obj) => obj.item).map((obj) => obj.item);
		} catch (err) {
			console.log(err);
		}
	});
</script>

<template>
	<h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
	<TheCardList :items="favorites" is-favorites class="mt-10" />
</template>
