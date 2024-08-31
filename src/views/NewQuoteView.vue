<template>
  <div>
    <h1 class="add-new-quote">Add a New Quote</h1>
    <form @submit.prevent="submitQuote">
      <div>
        <label for="author">Author:</label>
        <input v-model="quote.author" type="text" id="author" required />
      </div>
      <div>
        <label for="text">Quote:</label>
        <textarea v-model="quote.text" id="text" required></textarea>
      </div>
      <button type="submit">Add Quote</button>
      <p v-if="message" :class="{ success: success, error: !success }">
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const quote = ref({
  author: "",
  text: "",
});

const message = ref("");
const success = ref(false);

const submitQuote = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/quote/new",
      quote.value
    );
    message.value = "Quote added successfully!";
    success.value = true;
    quote.value.author = "";
    quote.value.text = "";
  } catch (error) {
    message.value = "Failed to add quote. Please try again.";
    success.value = false;
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
}

.add-new-quote {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 50px;
  color: white;
}

h1 {
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #ffffff;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
  background-color: rgba(55, 54, 54, 0.599);
  color: white;
}

textarea {
  height: 100px;
  resize: vertical;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #ff9800;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ffbb00;
}

p {
  margin-top: 10px;
  font-size: 1em;
  text-align: center;
}

.success {
  color: #28a745;
}

.error {
  color: #dc3545;
}
</style>
