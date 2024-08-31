<template>
  <div class="search-container">
    <input
      v-model="searchAuthor"
      type="text"
      placeholder="Search by author"
      class="search-input"
    />
    <input
      v-model="searchText"
      type="text"
      placeholder="Search by text"
      class="search-input"
    />
    <button @click="searchQuotes" class="search-button">Search</button>
  </div>

  <div class="quotes-list">
    <div v-for="quote in quotes" :key="quote.id" class="quote-item">
      <div v-if="quote.id === editingQuoteId">
        <input v-model="editText" class="quote-input" />
        <input v-model="editAuthor" class="quote-input" placeholder="Author" />
        <button @click="saveEdit(quote.id)" class="save-btn">Save</button>
        <button @click="cancelEdit" class="cancel-btn">Cancel</button>
      </div>
      <div v-else>
        <button @click="startEdit(quote)" class="edit-btn">Edit</button>
        <button @click="deleteQuote(quote.id)" class="delete-btn">X</button>
        <p v-if="quote.text" class="quote-text">"{{ quote.text }}"</p>
        <p v-if="quote.author" class="quote-author">
          - {{ quote.author || "Unknown" }}
        </p>
      </div>
    </div>
  </div>

  <div class="pagination-controls">
    <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
    <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage >= totalPages - 1">
      Next
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

const quotes = ref<Quote[]>([]);
const searchAuthor = ref<string>("");
const searchText = ref<string>("");

const editingQuoteId = ref<number | null>(null);
const editText = ref<string>("");
const editAuthor = ref<string>("");

const deleteQuote = async (id: number) => {
  try {
    await axios.delete(`http://localhost:8080/api/quote/${id}`);
    quotes.value = quotes.value.filter((quote) => quote.id !== id);
  } catch (error) {
    console.error("Error deleting quote:", error);
  }
};

const startEdit = (quote: Quote) => {
  editingQuoteId.value = quote.id;
  editText.value = quote.text;
  editAuthor.value = quote.author || "";
};

const cancelEdit = () => {
  editingQuoteId.value = null;
  editText.value = "";
  editAuthor.value = "";
};

const saveEdit = async (id: number) => {
  try {
    const updatedQuote = { text: editText.value, author: editAuthor.value };
    await axios.put(`http://localhost:8080/api/quote/${id}`, updatedQuote);
    const index = quotes.value.findIndex((quote) => quote.id === id);
    if (index !== -1) {
      quotes.value[index] = { ...quotes.value[index], ...updatedQuote };
    }
    editingQuoteId.value = null;
  } catch (error) {
    console.error("Error updating quote:", error);
  }
};

const currentPage = ref(0);
const pageSize = ref(10);
const totalPages = ref(0);

const fetchQuotes = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/quotes", {
      params: {
        page: currentPage.value,
        size: pageSize.value,
      },
    });
    quotes.value = response.data.content;
    totalPages.value = response.data.totalPages;
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    fetchQuotes();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    fetchQuotes();
  }
};

const searchQuotes = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/quotes/search",
      {
        params: {
          author: searchAuthor.value,
          text: searchText.value,
        },
      }
    );
    quotes.value = response.data;
  } catch (error) {
    console.error("Error searching quotes:", error);
  }
};

onMounted(() => {
  fetchQuotes();
});
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.search-button {
  padding: 8px 12px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #e68a00;
}

.quotes-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.delete-btn {
  position: absolute;
  border-radius: 5px;
  color: grey;
  border: 1px solid grey;
  top: 10px;
  right: 10px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.edit-btn {
  position: absolute;
  border-radius: 5px;
  color: grey;
  border: 1px solid grey;
  top: 10px;
  right: 40px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.quote-item:hover .delete-btn {
  opacity: 1;
}

.quote-item:hover .edit-btn {
  opacity: 1;
}

.delete-btn:hover {
  background-color: rgba(255, 0, 0, 0.294);
  color: white;
}

.edit-btn:hover {
  background-color: #e68a0061;
  color: white;
}

.quote-item {
  position: relative;
  background-color: rgba(55, 54, 54, 0.599);
  border-bottom: 2px solid #ff9800;
  padding: 5px;
  margin: 10px 0;
  width: 600px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quote-text {
  font-size: 1.4rem;
  font-style: italic;
  color: white;
  margin-bottom: 10px;
}

.quote-author {
  font-size: 1.1rem;
  color: rgb(180, 176, 176);
}

.quote-input {
  width: 90%;
  padding: 8px;
  background-color: rgba(55, 54, 54, 0.599);
  color: white;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.save-btn,
.cancel-btn {
  padding: 4px 8px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #4caf50;
  color: white;
}

.save-btn:hover {
  background-color: rgb(66, 168, 70);
}

.cancel-btn:hover {
  background-color: #ed1f10;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: white;
  gap: 20px;
  margin-bottom: 10px;
}

.pagination-controls button {
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: #ff9800;
  color: white;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-controls span {
  font-size: 1.1rem;
}
</style>
