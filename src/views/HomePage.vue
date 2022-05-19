<template>
	<ion-page class="page">
		<ion-content :fullscreen="true" :key="componentKey">
			<div id="container">
				<!-- Player -->
				<vue-plyr ref="plyr">
					<div data-plyr-provider="youtube" :data-plyr-embed-id="watchId"></div>
				</vue-plyr>

				<!-- Form -->
				<form class="inputs" @submit.prevent="createHandler">
					<div class="mb-3">
						<label for="titleInput" class="form-label">Title:</label>
						<input
							id="titleInput"
							type="text"
							class="form-control"
							placeholder="My beautiful video"
							v-model="content.title"
						/>
					</div>
					<div class="mb-3">
						<label for="urlInput" class="form-label">Video Url:</label>
						<input
							id="urlInput"
							type="url"
							class="form-control"
							placeholder="My video link"
							v-model="content.videoUrl"
						/>
					</div>
					<button type="submit" class="btn main-button">Add Video</button>
				</form>

				<!-- List -->
				<div class="list">
					<div class="list-group mb-5">
						<div class="card mb-5" v-for="(element, key) in list" :key="key">
							<img
								class="card-img-top click"
								:src="`https://img.youtube.com/vi/${element.watchId}/maxresdefault.jpg`"
								@click="handleVideoChange(element.watchId)"
							/>
							<div class="card-body">
								<p class="card-text">
									{{ element.title }}
								</p>
								<div class="d-flex justify-content-between mt-2">
									<small class="text-muted">3 days ago</small>
									<button
										type="button"
										class="btn btn-danger"
										@click="deleteHandler(element._id)"
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { IonContent, IonPage } from '@ionic/vue';
	import { io } from 'socket.io-client';
	import api from '../api';

	// const url = 'http://localhost:8081';
	const url = 'https://gundik.herokuapp.com';

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
				watchId: '5qap5aO4i9A',
				content: {
					title: '',
					videoUrl: '',
				},
				list: [],
				componentKey: 0,
			};
		},

		async created() {
			this.list = await api.getContents();
		},

		mounted() {
			this.player = this.$refs.plyr.player;

			// Emmits
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
				this.forceRerender();
			});

			socket.on('connect_error', (err) => {
				console.log(`connect_error due to ${err.message}`);
			});

			socket.on('connect_failed', (err) => {
				console.log(`connect_failed due to ${err.message}`);
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
			async createHandler() {
				api.createContent(this.content);
				this.content.title = '';
				this.content.videoUrl = '';
				this.list = await api.getContents();
				this.forceRerender();
			},

			async deleteHandler(id) {
				api.deleteContent(id);
				this.list = await api.getContents();
				this.forceRerender();
			},

			handleVideoChange(watchId) {
				socket.emit('video_change', watchId);
				this.watchId = watchId;
				this.forceRerender();
			},
			forceRerender() {
				this.componentKey += 1;
				this.player = this.$refs.plyr.player;
			},
		},
	};
</script>

<style scoped>
	.inputs {
		max-width: 500px;
		margin: 0 auto;
		margin-top: 50px;
		margin-bottom: 50px;
		color: var(--main-text-color);
	}
	.list {
		width: 70%;
		margin: 0 auto;
	}
	.card {
		background-color: var(--second-background-color);
		color: var(--main-text-color);
	}
	.click {
		cursor: pointer;
	}
</style>
