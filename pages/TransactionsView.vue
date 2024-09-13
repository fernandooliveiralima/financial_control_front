<script setup>
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})
</script>

<template>
    <div>
      Transactions View
      <TransactionsList/>
    </div>
</template>

<style scoped>

</style>