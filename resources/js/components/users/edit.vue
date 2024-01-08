<template>
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="card">
                <div class="card-header">
                    <h5>تعديل مستخدم</h5>
                </div>
                <div class="card-body">
                    <div class="alert alert-sm alert-danger" v-if="error">
                        {{ error }}
                    </div>
                    <form @submit.prevent="update">
                        <div class="form-group mb-3">
                            <label class="mb-1" for="name">الاسم</label>
                            <input
                                type="text"
                                class="form-control"
                                id="name"
                                v-model="form.name"
                                required
                            />
                        </div>
                        <!-- email -->
                        <div class="form-group mb-3">
                            <label class="mb-1" for="email"
                                >البريد الالكتروني</label
                            >
                            <input
                                type="email"
                                class="form-control"
                                id="email"
                                v-model="form.email"
                                required
                            />
                        </div>
                        <!-- password -->
                        <div class="form-group mb-3">
                            <label class="mb-1" for="password"
                                >كلمة المرور</label
                            >
                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                v-model="form.password"
                            />
                        </div>

                        <button
                            type="submit"
                            class="btn btn-primary text-center m-auto float-start"
                        >
                            حفظ
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async created() {
        let id = this.$route.params.id;
        await axios
            .get(`/api/users/${id}`)
            .then((response) => {
                this.form = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
            },
            error: null,
        };
    },
    methods: {
        async update() {
            this.error = null;
            if (
                this.form.name == "" ||
                this.form.email == "" ||
                this.form.password == ""
            ) {
                this.error = "يجب ملء جميع الحقول";
            }
            await axios
                .put(`/api/users/${this.form.id}`, this.form)
                .then((response) => {
                    this.$router.push("/users");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
