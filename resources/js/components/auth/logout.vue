<template></template>

<script>
export default {
    name: "Logout",
    methods: {
        logout() {
            axios.post("/api/logout").then((response) => {
                localStorage.removeItem("token");
                this.$router.push({ name: "login" });
            });
        },
    },
};
</script>
