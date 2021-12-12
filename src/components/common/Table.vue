<template>
  <table class="table">
    <thead>
    <tr>
      <th v-for="(col, key) in columns" :key="key" :class="[{sortable: col.sortable}]"
          @click="onSort(col, key)">
        <div class="sortable-inner">
          <span>{{ col.name }}</span>
          <div class="table__sort" v-if="col.sortable"
               :class="[{[sortDirection]: sortBy === key}]">
            <svg viewBox="0 0 10 5" fill="none" class="table__sort-asc">
              <path d="M5 0L10 5H0L5 0Z"/>
            </svg>
            <svg viewBox="0 0 10 5" fill="none" class="table__sort-desc">
              <path d="M5 5L10 1.63913e-07H0L5 5Z"/>
            </svg>
          </div>
        </div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, i) in sortedRows" :key="`row-${i}`">
      <td v-for="(col, key) in columns" :key="key">
        <slot :name="key" :value="key in row ? row[key] : null">
          {{ key in row ? row[key] : null }}
        </slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'

const props = defineProps({
  columns: Array,
  data: Array,
})

const {
  columns,
  data,
} = toRefs(props)

const sortBy = ref(null)
const sortDirection = ref('desc')

const onSort = (column, key) => {
  if (!column.sortable) return
  if (key === sortBy.value) {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = key
    sortDirection.value = 'desc'
  }
}

const sortedRows = computed(() => {
  let result = data.value
  if (sortBy.value) {
    result = result.sort((a, b) => {
      const val1 = a[sortBy.value]
      const val2 = b[sortBy.value]
      if (columns.value[sortBy.value]?.sort) return columns.value[sortBy.value]?.sort(val1, val2)
      return val1 - val2
    })
    if (sortDirection.value === 'desc') result.reverse()
  }
  return result
})
</script>

<style lang="stylus" scoped>
.table
  display block
  max-width 100%
  overflow auto
  white-space nowrap

  th
    white-space nowrap

    &.sortable
      cursor pointer

    .sortable-inner
      display flex
      justify-content space-between
      align-items center
      gap 15px

  &__sort
    display inline-flex
    flex-direction column
    gap 4px
    float right
    vertical-align middle

    svg
      display block
      width 10px
      height 5px
      fill #9B9B9B
      transition all .3s ease

    &.asc &
      &-asc
        transform translateY(5px)

      &-desc
        opacity 0
        transform translateY(3px)

    &.desc &
      &-asc
        opacity 0
        transform translateY(-3px)

      &-desc
        transform translateY(-5px)
</style>
