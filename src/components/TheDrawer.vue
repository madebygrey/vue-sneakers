<script setup>
	import { ref, watch, inject, computed } from "vue";
	import axios from "axios";
	import TheDrawerHead from "./TheDrawerHead.vue";
	import TheDrawerCardList from "./TheDrawerCardList.vue";
	import TheInfoBlock from "./TheInfoBlock.vue";

	const props = defineProps({
		totalPrice: Number,
		vatPrice: Number,
	});

	const { cart, closeDrawer } = inject("cart");

	const isCreating = ref(false);
	const orderId = ref(null);

	const createOrder = async () => {
		try {
			isCreating.value = true;
			const { data } = await axios.post(
				"https://604781a0efa572c1.mokky.dev/orders",
				{
					items: cart.value,
					totalPrice: props.totalPrice.value,
				}
			);

			cart.value = [];

			orderId.value = data.id;

			return data;
		} catch (err) {
			console.log(err);
		} finally {
			isCreating.value = false;
		}
	};

	const cartIsEmpty = computed(() => cart.value.length === 0);

	const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value);
</script>

<template>
	<div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
	<div class="flex flex-col bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
		<TheDrawerHead></TheDrawerHead>
		<div v-if="!totalPrice || orderId" class="my-auto">
			<TheInfoBlock
				v-if="orderId"
				title="Заказ оформлен"
				:desc="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
				imageUrl="/order-success-icon.png" />
			<TheInfoBlock
				v-if="!totalPrice && !orderId"
				title="Корзина пустая"
				desc="Добавте хотя бы один кроссовок"
				imageUrl="/package-icon.png" />
		</div>
		<div v-else>
			<TheDrawerCardList />
			<div class="flex flex-col gap-4 mt-7">
				<div class="flex gap-2">
					<span>Итого:</span>
					<div class="flex-1 border-b border-dashed"></div>
					<b>{{ totalPrice }} руб.</b>
				</div>
				<div class="flex gap-2">
					<span>Налог 5%:</span>
					<div class="flex-1 border-b border-dashed"></div>
					<b>{{ vatPrice }} руб.</b>
				</div>
				<button
					:disabled="buttonDisabled"
					@click="createOrder"
					class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 transition">
					Оформить заказ
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
