<template>
  <div>
    book/edit/_id<br>
    {{ $route.params.id }}
    {{ books[$route.params.id].title }}
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      default: () => {}
    }
  }
}
</script>