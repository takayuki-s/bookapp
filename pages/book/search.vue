<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="keyword"
          label="本のタイトルを検索"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn
          color="primary"
          @click="search(keyword)"
        >検索する</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          color="secondary"
          to="/book"
        >一覧に戻る</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
     return {
      keyword: '',
      searchResults: [],
     }
  },
  methods: {
    async search(keyword) {
      this.searchResults = []
      // クエリーストリングを作成
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
      const params = {
        q: `intitle:${keyword}`,
        maxResults: 40
      }
      const queryParams = new URLSearchParams(params)
      console.log(baseUrl + queryParams)
      const response = await fetch(baseUrl + queryParams).then(response => response.json())
      console.log(response.items)
      for (const book of response.items) {
        const title = book.volumeInfo.title
        const img = book.volumeInfo.imageLinks
        const description = book.volumeInfo.description
        this.searchResults.push({
          title: title ? title : '', // eslint-disable-line
          image: img ? img.thumbnail : '',
          description: description ? description.slice(0, 40) : '',
        })
      }
    }
  }
}
</script>