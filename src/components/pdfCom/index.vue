<template>
  <div>
    <web-view :src="pdfUrl"></web-view>
  </div>
</template>
<script>
export default {
  name: 'pdf',
  data() {
    return {
      pdfUrl: ''
    }
  },
  onLoad: function (option) {
    this.pdfUrl = option.pdfUrl
  }
}
</script>
<style scoped>
</style>
