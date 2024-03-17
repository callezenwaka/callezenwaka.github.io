<template>
	  <div class="pagination--wrapper">
    <ul class="pagination" v-if="data.length > (perPage) || currentPage > 1">
      <li class="pagination-item" title="First page">
        <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
          &#10094;&#10094;
        </button>
      </li>

      <li class="pagination-item" title="Previous page">
        <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
          &#10094;
        </button>
      </li>

      <li class="pagination-item" v-for="(page, index) in pages" :key="index">
        <button type="button" @click="onClickPage(page.number)" :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.number) }">
          {{ page.number }}
        </button>
      </li>

      <li class="pagination-item" title="Next page">
        <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
          &#10095;
        </button>
      </li>
      <li class="pagination-item" title="Last page">
        <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
          &#10095;&#10095;
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
});

const emit = defineEmits(["pagechanged"]);

const startPage = computed(() => {
  if (props.currentPage === 1) return 1
  if (props.currentPage === props.totalPages) return props.totalPages - props.maxVisibleButtons + (props.maxVisibleButtons - 1)
  return props.currentPage - 1
});

const endPage = computed(() => {
  return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages)
});

const pages = computed(() => {
  let range = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push({
      number: i,
      isDisabled: i === props.currentPage
    });
  }
  return range
});

const isInFirstPage = computed(() => {
  return props.currentPage === 1;
});

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

onMounted(async () => {
  emit('pagechanged', 1)
});

const onClickFirstPage = () => {
  emit('pagechanged', 1)
};

const onClickPreviousPage = () => {
  emit('pagechanged', (props.currentPage - 1))
}

const onClickPage = (page: number) => {
  emit('pagechanged', page)
}

const onClickNextPage = () => {
  emit('pagechanged', (props.currentPage + 1))
}

const onClickLastPage = () => {
  emit('pagechanged', (props.totalPages));
}

const isPageActive = (page: number) => {
  return props.currentPage === page;
};

</script>

<style scoped lang="css">
.paginations {
  display: flex;
  height: calc(100% - 1.25rem);
  flex-direction: column;
}
.pagination--wrapper {
  margin: 1rem auto;
}
.pagination {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: auto 0 0 0;
  list-style-type: none;
  align-items: center;
}
.pagination-item button {
  margin: 0 !important;
  padding: .25rem .5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: .25rem;
  background: none;
}
.pagination-item button:hover {
  cursor: pointer;
  background-color: silver;
}
.pagination-item button[disabled="disabled"] {
  color: silver;
  cursor: default;
}
.pagination-item button[disabled="disabled"]:hover {
  cursor: default;
  background-color: transparent;
}
.pagination-item button.active {
  color: red;
}
</style>