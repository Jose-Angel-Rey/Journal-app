<template>
  <div class="input-container">
    <input type="text" v-model="term" placeholder="Search" />
  </div>

  <button
    class="add-entry-button"
    @click="$router.push({ name: 'entry-details', params: { entryId: 'new' } })"
  >
    <div class="fa fa-plus"></div>
    Add Entry
  </button>

  <div class="entries-container">
    <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  name: "EntryList",
  components: {
    Entry: defineAsyncComponent(() => import("./Entry.vue")),
  },
  data() {
    return {
      term: "",
    };
  },
  computed: {
    ...mapGetters({
      getEntriesByTerm: "journal/getEntriesByTerm",
    }),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  padding: 1rem 0;
  input {
    border: none;
    border-radius: 5px;
    padding: 0.8rem 1rem;
    width: 85%;
  }
}

.add-entry-button {
  background-color: #252525;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: .8rem 0.5rem;
  outline: none;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  width: 85%;
  &:hover {
    background-color: #353535;
  }
  &:active {
    background-color: #151515;
  }
}

.entries-container {
  overflow-y: scroll;
  height: calc(100vh - 135px);
  padding: 1rem 0;
}
</style>
