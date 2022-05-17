<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Blank</ion-title>
				</ion-toolbar>
			</ion-header>

			<div id="container">
				<youtube-iframe
					video-id="b69tTn-8p20"
					playerWidth="100%"
					playerHeight="500"
				></youtube-iframe>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
	} from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'HomePage',
		components: {
			IonContent,
			IonHeader,
			IonPage,
			IonTitle,
			IonToolbar,
		},
	});
</script>

<style scoped></style>
