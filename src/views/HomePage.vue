<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div id="container">
				<vue-plyr ref="plyr">
					<div
						data-plyr-provider="youtube"
						data-plyr-embed-id="bTqVqk7FSmY"
					></div>
				</vue-plyr>
			</div>
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
		mounted() {
			this.$refs.plyr.player.on('ready', () => console.log('ready'));
			this.$refs.plyr.player.on('play', () => console.log('play'));
			this.$refs.plyr.player.on('pause', () => console.log('pause'));
		},

		methods: {
			playing() {
				socket.emit('play');
			},
			paused() {
				socket.emit('pause');
			},
		},
	};
</script>

<style></style>
