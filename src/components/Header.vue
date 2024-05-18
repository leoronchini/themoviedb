<template>
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style scoped>
  header {
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  nav ul li {
    display: inline;
    margin: 0 15px;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
  }
  
  nav ul li a:hover {
    text-decoration: underline;
  }
  </style>
  