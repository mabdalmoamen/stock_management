<template>
    <div class="container-fluid">
        <nav-app />
        <div class="container-fluid mt-2 min-h-50">
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
<style>
.active {
    background-color: green;
    color: white !important;
    border-radius: 5px;
}
</style>
