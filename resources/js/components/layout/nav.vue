<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light">
        <div class="container-fluid">
            <router-link v-if="$route.path !== '/login' && user" to="/" class="navbar-brand">
                {{ user.name }}
            </router-link>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul v-if="$route.path !== '/login'" class="navbar-nav m-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">الرئيسية</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/users" class="nav-link">مدير الجرد الحاسب</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/employees" class="nav-link">الموظفون</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/items" class="nav-link">العهد</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/new" class="nav-link">صرف معدة</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/reports" class="nav-link">التقارير</router-link>
                    </li>
                </ul>
                <router-link v-if="$route.path === '/login'" to="/login" class="nav-item nav-link navbar-text">تسجيل
                    الدخول</router-link>
                <button v-else class="navbar-text bg-transparent border-0" @click="logout()">
                    تسجيل خروج
                </button>
            </div>
            <!-- nabbar left -->

            <!-- navbar right -->
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavApp",
    async created() {
        await this.getCurrentUSer();
    },
    data() {
        return {
            user: null,
        };
    },
    methods: {
        async logout() {
            await this.getCurrentUSer();
            if (localStorage.getItem("token")) {
                if (this.user == null) {
                    localStorage.removeItem("token");
                    this.$router.push({ name: "Login" });
                }
                await axios.post("/api/logout").then((response) => {
                    localStorage.removeItem("token");
                    this.$router.push({ name: "Login" });
                });
                return;
            }
            this.$router.push({ name: "Login" });
        },
        async getCurrentUSer() {
            if (localStorage.getItem("token")) {
                await axios
                    .get("/api/user")
                    .then((response) => {
                        this.user = response.data;
                    })
                    .catch((error) => {
                        this.user = null;
                        localStorage.removeItem("token");
                        console.log(error);
                    });
                return;
            }
            this.user = null;
        },
    },
};
</script>
