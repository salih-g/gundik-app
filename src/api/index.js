import axios from './axios';

export default {
	async createContent(data) {
		if (!data.title) {
			data.title = randomWord();
		}

		return await axios()
			.post('/list', { title: data.title, videoUrl: data.videoUrl })
			.then((response) => response.data);
	},

	async getContents() {
		return await axios()
			.get('/list')
			.then((response) => response.data);
	},

	async deleteContent(_id) {
		return await axios()
			.delete(`/list/${_id}`)
			.then((response) => response.data);
	},
};

const randomWord = () => {
	const words = ['Gundik', 'Anka', 'Gundik Gunsayan', 'Gukuk kuslari oter'];
	return words[Math.floor(Math.random() * words.length)];
};
