<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div id="container">
				<vue-plyr ref="plyr">
					<div data-plyr-provider="youtube" :data-plyr-embed-id="watchId"></div>
				</vue-plyr>
				<!-- <div class="move-to">
					<span class="margin-left"> Minutes: </span>
					<input
						type="number"
						class="form-control d-inline"
						placeholder="10"
						v-model="moveTo"
					/>
					<button
						type="button"
						class="btn d-inline main-button"
						@click="goSecond()"
					>
						Move To
					</button>
				</div> -->
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { IonContent, IonPage } from '@ionic/vue';
	import { io } from 'socket.io-client';
	const url = 'http://localhost:8081';

	const socket = io(url, {
		transports: ['websocket'],
	});

	export default {
		name: 'HomePage',
		components: {
			IonContent,
			IonPage,
		},
		data() {
			return {
				moveTo: Number,
				player: null,
				watchId: 'bTqVqk7FSmY',
			};
		},
		mounted() {
			this.player = this.$refs.plyr.player;

			console.log(this.player);

			// Emmits
			this.player.on('ready', () => console.log('ready'));

			this.player.on('play', () => {
				socket.emit('play');
			});

			this.player.on('pause', () => {
				socket.emit('pause');
			});

			// Sockets
			socket.on('start_playing', () => {
				this.player.play();
			});

			socket.on('stop_playing', () => {
				this.player.pause();
			});

			socket.on('watchId', (watchId) => {
				this.watchId = watchId;
			});

			socket.on('connect_error', (err) => {
				console.log(`connect_error due to ${err.message}`);
			});

			socket.on('goTo', (second) => {
				const goSecond = second * 60;
				if (second === 0) {
					this.player.restart();
				} else if (this.player.currentTime <= goSecond) {
					this.player.forward(goSecond - this.player.currentTime);
				} else {
					this.player.rewind(this.player.currentTime - goSecond);
				}
			});
		},

		methods: {
			// goSecond() {
			// 	const goSecond = this.moveTo * 60;
			// 	if (this.player.currentTime <= goSecond) {
			// 		this.player.forward(goSecond - this.player.currentTime);
			// 	} else {
			// 		this.player.rewind(this.player.currentTime - goSecond);
			// 	}
			// 	socket.emit('moveTo', goSecond);
			// },
		},
	};
</script>

<style>
	.move-to {
		margin-top: 30px;
	}
</style>
