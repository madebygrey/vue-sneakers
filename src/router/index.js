import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Favorites from "@/pages/Favorites.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", component: Home },
		{ path: "/favorites", component: Favorites },
	],
});

export default router;
