<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div id="container"></div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { IonContent, IonPage } from '@ionic/vue';
	import { io } from 'socket.io-client';

	const socket = io('http://localhost:8081');

	socket.on('connect', () => {
		console.log('connected');
	});

	export default {
		name: 'HomePage',
		components: {
			IonContent,
			IonPage,
		},
		data() {
			return {
				player: null,
			};
		},
		// mounted() {},

		methods: {
			// handleState(e) {},
			playing() {
				socket.emit('play');
			},
			paused() {
				socket.emit('pause');
			},
		},
	};
</script>

<style scoped></style>
