<template>
  <inline-svg :src="path"/>
</template>

<script>
export default {
  name: 'Icon',
  props: ['name'],
  computed: {
    path() {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/icons/${this.name}.svg`);
    },
  },
};
</script>
