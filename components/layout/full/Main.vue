<script setup lang="ts">
import { ref, shallowRef } from "vue";
import sidebarItems from "@/components/layout/full/vertical-sidebar/sidebarItem";
import MenuIcon from "~icons/material-symbols/menu-rounded";
const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);
</script>

<template>
  <!------Sidebar-------->
  <v-navigation-drawer
    elevation="0"
    app
    class="leftSidebar"
    v-model="sDrawer"
    location="left"
  >
    <!---Logo part -->
    <div class="pa-5">
      <LayoutFullLogo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div>
      <perfect-scrollbar class="scrollnavbar">
        <v-list class="pa-6">
          <!---Menu Loop -->
          <template v-for="(item, i) in sidebarMenu">
            <!---Item Sub Header -->
            <LayoutFullVerticalSidebarNavGroup
              :item="item"
              v-if="item.header"
              :key="item.title"
            />

            <!---Single Item-->
            <LayoutFullVerticalSidebarNavItem
              v-else
              :item="item"
              :size="item.size"
              class="leftPadding"
            />
            <!---End Single Item-->
          </template>
        </v-list>
      </perfect-scrollbar>
    </div>
  </v-navigation-drawer>
  <!------Header-------->
  <v-app-bar elevation="0" height="70">
    <div class="d-flex align-center justify-space-between w-100">
      <div>
        <v-btn
          class="hidden-lg-and-up ml-md-3 ml-sm-5 ml-3 text-muted"
          @click="sDrawer = !sDrawer"
          icon
          variant="flat"
          size="small"
        >
          <v-icon :icon="MenuIcon" />
        </v-btn>
        <!-- User Profile -->
      </div>

      <div>
        <!-- Notification -->
        <LayoutFullVerticalHeaderToggleThemeDD />
        <LayoutFullVerticalHeaderProfileDD />
      </div>
    </div>
  </v-app-bar>
</template>
