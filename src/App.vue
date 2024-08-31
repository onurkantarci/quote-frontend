<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/quotes" class="nav-link">QuoteList</router-link>
      <router-link to="/new" class="nav-link">Create</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: rgb(37, 36, 36);
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 30px;
  background-color: #304b3f;
  padding: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.nav-link {
  text-decoration: none;
  font-size: 14px;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
