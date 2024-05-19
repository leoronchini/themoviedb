<template>
  <header class="text-white" style="background-color: rgb(3, 37, 65);">
    <div class="container mx-auto flex items-center justify-between p-4">
      <div class="flex items-center space-x-4">
        <a href="/">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="TMDB" class="w-32" />
        </a>
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
