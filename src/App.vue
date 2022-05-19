<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>

<script lang="ts">
	import { IonApp, IonRouterOutlet } from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'App',
		components: {
			IonApp,
			IonRouterOutlet,
		},
	});
</script>

<style>
	:root {
		--main-text-color: #eeeeee;
		--main-background-color: #212121;
		--second-background-color: #323232;
		--main-button-color: #ff9999;
		--main-button-hover-color: #da8686;
		--ion-background-color: var(--main-background-color);
		--ion-text-color: var(var(--main-text-color));
	}

	body {
		background-color: var(--main-background-color);
		--plyr-color-main: var(--main-button-color);
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--main-text-color);
	}

	.con {
		width: 97%;
		margin: 0 auto;
	}
	.watch {
		height: 200px;
	}

	.main-button {
		background-color: var(--main-button-color);
		border-color: var(--main-button-color);
	}

	.main-button:hover {
		background-color: var(--main-button-hover-color);
	}
	@media only screen and (min-width: 500px) {
		.watch {
			height: 450px;
		}
	}
	@media only screen and (min-width: 1000px) {
		.watch {
			height: 800px;
		}
	}
</style>
