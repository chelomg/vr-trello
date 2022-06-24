<template>
  <div class="my-3 px-6 py-2 border-2 border-gray-200"> {{ card.name }}</div>
</template>

<script>
export default {
  name: 'CardBlock',
  props: ['card']
}
</script>
