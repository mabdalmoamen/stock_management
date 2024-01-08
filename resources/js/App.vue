<template>
    <div class="container-fluid">
        <nav-app />
        <div
            class="container mt-5 min-h-50"
            style="background-color: rgb(68, 109, 77)"
        >
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
