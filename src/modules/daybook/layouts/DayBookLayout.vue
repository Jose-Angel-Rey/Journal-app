<template>
  <Navbar />

  <section v-if="!isLoading">
    <div class="entry-list-container">
      <EntryList />
    </div>

    <div class="entry-container">
      <router-view />
    </div>
  </section>
  <div v-else>
    <LoadingSpinner />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "DayBookLayout",
  components: {
    Navbar: defineAsyncComponent(() => import("../components/Navbar")),
    EntryList: defineAsyncComponent(() => import("../components/EntryList")),
    LoadingSpinner: defineAsyncComponent(() =>
      import("@/components/LoadingSpinner")
    ),
  },
  computed: mapState({
    isLoading: (state) => state.journal.isLoading,
  }),
  methods: {
    ...mapActions({
      getEntries: "journal/getEntries",
    }),
  },
  created() {
    this.getEntries();
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
}
.entry-container {
  background-color: #eee;
  width: 70%;
}
.entry-list-container {
  background-color: #ccc;
  width: 30%;
  border-right: 2px solid #ddd;

  @media screen and (max-width: 700px) {
    width: 50%;
  }
}
</style>
