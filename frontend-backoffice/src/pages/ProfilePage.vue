<template>
    <PageLayout>
    <div class="content-layout">
      <h1 id="page-title" class="content__title">Profile Page</h1>
      <div class="content__body">
        <p id="page-description">
          <span
            >You can use the <strong>ID Token</strong> to get the profile
            information of an authenticated user.</span
          >
          <span
            ><strong
              >Only authenticated users can access this page.</strong
            ></span
          >
        </p>
        <div class="profile-grid">
          <div class="profile__header">
            <img :src="user.picture" alt="Profile" class="profile__avatar" />
            <div class="profile__headline">
              <h2 class="profile__title">{{ user.name }}</h2>
              <span class="profile__description">{{ user.email }}</span>
            </div>
          </div>
          <div class="profile__details">
          </div>
        </div>
      </div>
    </div>
    </PageLayout>
</template>

<script setup>
//AUTH0 REACTIVATE
import { useAuth0 } from "@auth0/auth0-vue";

import PageLayout from "../components/layout/PageLayout.vue";

//AUTH0 REACTIVATE
const { user } = useAuth0();
const code = user ? JSON.stringify(user.value, null, 2) : "";
</script>