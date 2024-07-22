<template>
    <div>
      <button @click="handleGoogleLogin">Login with Google</button>
    </div>
  </template>
  
  <script setup lang="ts">
    function handleGoogleLogin() {
        window.location.href = 'http://localhost:8000/api/auth/google/login';
    }
  </script>