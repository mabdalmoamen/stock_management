<template>
    <div class="container-fluid">
        <nav-app />
        <div class="container mt-5">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import NavApp from "./components/layout/nav.vue";
export default {
    components: {
        NavApp,
    },
};
</script>
