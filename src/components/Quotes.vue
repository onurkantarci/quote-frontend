<template>
  <div class="quote-generator">
    <h1>Quote Generator</h1>
    <div v-if="randomQuote" class="quote-container">
      <p>#{{ randomQuote.id }}</p>
      <p class="quote-text">"{{ randomQuote.text }}"</p>
      <p class="quote-author">- {{ randomQuote.author || "Unknown" }}</p>
    </div>
    <button @click="fetchRandomQuote()" class="quote-button">
      Generate Random Quote
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

interface Quote {
  id: number;
  text: string;
  author?: string;
}

const randomQuote = ref<Quote | null>(null);

const fetchRandomQuote = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/quotes/random");
    console.log("API Response:", response.data);
    randomQuote.value = response.data;
  } catch (error) {
    console.error("Error fetching random quote:", error);
  }
};

onMounted(() => {
  fetchRandomQuote();
});
</script>

<style scoped>
.quote-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 20px;
}

.quote-container {
  background-color: rgba(55, 54, 54, 0.599);
  border-left: 4px solid #ffab02;
  padding: 20px;
  margin-bottom: 20px;
  max-width: 600px;
  color: white;
  text-align: center;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quote-text {
  font-size: 1.5rem;
  font-style: italic;
  color: #ffffff;
}

.quote-author {
  font-size: 1.2rem;
  margin-top: 10px;
  color: #dcdada;
}

.quote-button {
  background-color: #b78d3a;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.quote-button:hover {
  background-color: #b78d3ab4;
}
</style>
