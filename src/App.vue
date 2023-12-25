<script setup>
	import { ref, onMounted, watch, reactive } from "vue";
	import axios from "axios";

	import TheHeader from "./components/TheHeader.vue";
	import TheCardList from "./components/TheCardList.vue";
	import TheDrawer from "./components/TheDrawer.vue";

	const products = ref([]);

	const filters = reactive({
		sortBy: "title",
		searchQuery: "",
	});

	const fetchFavourites = async () => {
		try {
			const { data: favourites } = await axios.get(
				"https://604781a0efa572c1.mokky.dev/favorites"
			);
			products.value = products.value.map((item) => {
				const favourite = favourites.find(
					(favourite) => favourite.parentId == item.id
				);

				if (!favourite) {
					return item;
				}

				return {
					...item,
					isFavorite: true,
					favouriteId: favourite.id,
				};
			});
		} catch (err) {
			console.log(err);
		}
	};

	const addToFavourite = async (item) => {
		item.isFavorite = !item.isFavorite;
		try {
			if (!item.isFavorite) {
				const obj = {
					parentId: item.id,
				};

				const { data } = await axios.post(
					"https://604781a0efa572c1.mokky.dev/favorites",
					obj
				);
				item.favouriteId = data.id;
			} else {
				await axios.delete(
					`https://604781a0efa572c1.mokky.dev/favorites/${item.favouriteId}`
				);
				item.favouriteId = null;
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchItems = async () => {
		try {
			const params = {
				sortBy: filters.sortBy,
			};
			if (filters.searchQuery) {
				params.title = `*${filters.searchQuery}*`;
			}
			const { data } = await axios.get(
				"https://604781a0efa572c1.mokky.dev/items",
				{
					params,
				}
			);
			products.value = data.map((obj) => ({
				...obj,
				isFavorite: false,
				favouriteId: null,
				isAdded: false,
			}));
		} catch (err) {
			console.log(err);
		}
	};

	onMounted(async () => {
		await fetchItems();
		await fetchFavourites();
	});

	watch(filters, fetchItems);
</script>

<template>
	<!-- <TheDrawer /> -->
	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
		<TheHeader />
		<div class="p-10">
			<div class="flex justify-between items-center">
				<h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
				<div class="flex gap-4">
					<select
						@change="filters.sortBy = $event.target.value"
						class="py-2 px-3 border rounded-md outline-none">
						<option value="name">По названию</option>
						<option value="price">По цене (дешевые)</option>
						<option value="-price">По цене (дорогие)</option>
					</select>
					<div class="relative">
						<img src="/search.svg" class="absolute left-4 top-3" alt="" />
						<input
							v-model="filters.searchQuery"
							@input="filters.searchQuery = $event.target.value"
							class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
							type="text"
							placeholder="Поиск..." />
					</div>
				</div>
			</div>

			<TheCardList
				:items="products"
				@addToFavourite="addToFavourite"
				class="mt-10" />
		</div>
	</div>
</template>

<style scoped></style>
