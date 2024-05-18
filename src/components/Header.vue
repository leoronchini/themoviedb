<template>
  <header class="bg-gray-900 text-white">
    <div class="container mx-auto flex items-center justify-between p-4">
      <div class="flex items-center space-x-4">
        <a href="/" class="text-xl font-bold">TMDB</a>
        <nav class="hidden md:flex space-x-4">
          <a href="/" class="hover:text-gray-400">Movies</a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
