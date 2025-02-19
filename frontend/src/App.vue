<template>
  <div id="app">
    <h1>Lista de Usuarios</h1>

    <input v-model="nombre" type="text" placeholder="Nombre" class="input" />
    <button @click="addUser" class="button">Agregar Usuario</button>
    <button @click="loadUsers" class="button">Cargar Usuarios</button>

    <ul>
      <li v-for="user in usuarios" :key="user.id_client">
        {{ user.id_client }} - {{ user.name }}
      </li>
    </ul>

    <p class="message">{{ mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Definir el tipo de usuario según la estructura de la BD
interface Usuario {
  id_client: number;
  name: string;
}

const nombre = ref('');
const usuarios = ref<Usuario[]>([]); // Especificamos que es un array de "Usuario"
const mensaje = ref('');

const API_URL = "http://localhost:3000"; // Cambia esto si despliegas la API

// Función para obtener usuarios de la API
const loadUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/usuarios`);
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    usuarios.value = await response.json();
  } catch (error) {
    console.error('Error:', error);
    mensaje.value = 'Error al cargar usuarios';
  }
};

// Función para insertar un usuario en la API
const addUser = async () => {
  if (!nombre.value) {
    mensaje.value = 'El nombre es obligatorio';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre.value }),
    });

    if (!response.ok) {
      throw new Error('Error al insertar usuario');
    }

    const data: Usuario = await response.json(); // Especificamos que la respuesta es del tipo "Usuario"
    mensaje.value = `Usuario ${data.name} agregado con éxito`;

    // Limpiar los campos después de la inserción y recargar la lista
    nombre.value = '';
    loadUsers();
  } catch (error) {
    console.error('Error:', error);
    mensaje.value = 'Hubo un error al agregar el usuario';
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 8px auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 10px;
  width: 200px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
}

.button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f4f4f4;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}

.message {
  margin-top: 10px;
  font-size: 14px;
  color: #28a745;
}
</style>


<!-- Comment 
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>-->
