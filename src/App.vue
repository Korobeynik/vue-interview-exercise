<template>
  <v-app id="inspire">
    <v-app-bar
            app
            color="indigo"
            dark
    >
      <v-toolbar-title class="title ml-3 mr-5">TV Shows</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
              class="hidden-sm-and-down"
              v-model="search"
              @input="onSearch"
      ></v-text-field>
    </v-app-bar>

    <v-main>
      <v-container
              class="fill-height"
              fluid
      >
        <v-row
                align="center"
                justify="center"
        >
          <v-col class="text-center">
            <v-card>
              <v-card-title>
                Shows
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="searchInTable"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                      :headers="headers"
                      :items="tvShows"
                      :items-per-page="10"
                      class="elevation-1"
                      :search="searchInTable"
                      :loading="loader"
                      loading-text="Loading... Please wait"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
            color="indigo"
            app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
    export default {
        data: () => ({
            search: 'girls',
            searchInTable: '',
            loader: true,
            headers: [
                {text: 'Name', align: 'start', sortable: true, value: 'name',},
                {text: 'Language', value: 'language', sortable: false,},
                {text: 'Rating', value: 'rating.average'},
                {text: 'The status of the show', value: 'status'},
                {text: 'Genres', value: 'genres', sortable: false,}
            ],

        }),

        computed: {
            tvShows() {
                return this.$store.getters.tvShows.map(show => {
                    return show.show
                })
            }
        },

        methods: {
            async onSearch() {
                if (this.search.length < 1) {
                    return false
                } else {
                    this.loader = true;
                    const formData = this.search;
                    try {
                        await this.$store.dispatch("getTvShows", formData);
                        this.loader = false;
                    } catch (e) {
                        console.log(e)
                    }
                }
            },
        },

        async mounted() {
            await this.onSearch();
            this.loader = false;
        }
    }
</script>
