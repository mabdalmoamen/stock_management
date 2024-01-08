<template>
    <div>
        <!-- center login form -->
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">تسجيل الدخول</h5>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-sm alert-danger" v-if="error">
                            {{ error }}
                        </div>
                        <form @submit.prevent="login">
                            <div class="form-group mb-3">
                                <label class="mb-1" for="email"
                                    >البريد الالكتروني</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="email"
                                    v-model="email"
                                />
                            </div>
                            <div class="form-group mb-3">
                                <label class="mb-1" for="password"
                                    >كلمة المرور</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    v-model="password"
                                />
                            </div>
                            <button
                                type="submit"
                                class="btn btn-primary text-center m-auto"
                            >
                                تسجيل الدخول
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            error: null,
        };
    },
    methods: {
        async login() {
            this.error = null;
            await axios
                .post("/api/login", {
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data);
                    location.reload();
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                });
        },
    },
};
</script>
