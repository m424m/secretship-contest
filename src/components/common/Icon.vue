<template>
  <inline-svg :src="path" :class="`icon-${name}`"/>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Icon',
  props: ['name'],
  setup(props) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const path = computed(() => require(`@/assets/icons/${props.name}.svg`))
    return {
      path,
    }
  },
}
</script>
