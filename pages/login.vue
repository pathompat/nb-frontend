<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="pa-4" width="400">
      <v-card-title class="text-h5 text-center" elevation="16">Log into your account</v-card-title>
      <v-card-subtitle></v-card-subtitle>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Email address"
            variant="outlined"
            class="mb-2"
            clearable
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            variant="outlined"
            class="mb-2"
            clearable
          ></v-text-field>
          <!-- <v-checkbox label="Remember me" class="mb-4"></v-checkbox> -->
          <v-btn block size="large" color="primary" class="mb-4">Log In</v-btn>
          <!-- <div class="text-center">
            <a href="#" class="text-decoration-none">Forgot password?</a>
          </div>
          <div class="text-center mt-4">
            <p>Or continue with</p>
            <v-btn icon color="red">
              <v-icon>mdi-google</v-icon>
            </v-btn>
            <v-btn icon color="blue">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </div> -->
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'custom' as globalThis.MaybeRef<false | "default">
  })
</script>

<style scoped>
  a {
    color: #ffffff;
  }
  a:hover {
    text-decoration: underline;
  }
</style>