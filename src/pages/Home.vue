<script setup>
	import { inject, reactive, watch, ref, onMounted } from "vue";
	import axios from "axios";
	import TheCardList from "../components/TheCardList.vue";

	const { cart, addToCart, removeFromCart } = inject("cart");

	const products = ref([]);

	const filters = reactive({
		sortBy: "title",
		searchQuery: "",
	});

	const onClickAddPlus = (item) => {
		if (!item.isAdded) {
			addToCart(item);
		} else {
			removeFromCart(item);
		}
	};
	const addToFavourite = async (item) => {
		item.isFavorite = !item.isFavorite;
		try {
			if (!item.isFavorite) {
				const obj = {
					item_id: item.id,
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
	const fetchFavourites = async () => {
		try {
			const { data: favourites } = await axios.get(
				"https://604781a0efa572c1.mokky.dev/favorites"
			);
			products.value = products.value.map((item) => {
				const favourite = favourites.find(
					(favourite) => favourite.item_id == item.id
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
		const localCart = localStorage.getItem("cart");
		cart.value = localCart ? JSON.parse(localCart) : [];

		await fetchItems();
		await fetchFavourites();

		products.value = products.value.map((item) => ({
			...item,
			isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
		}));
	});

	watch(filters, fetchItems);

	watch(cart, () => {
		products.value = products.value.map((item) => ({
			...item,
			isAdded: false,
		}));
	});
</script>

<template>
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
		@add-to-favourite="addToFavourite"
		@add-to-cart="onClickAddPlus"
		class="mt-10" />
</template>

<style scoped></style>
