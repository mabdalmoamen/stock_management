<template>
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="card">
                <div class="card-header"><h5>تعديل موظف</h5></div>
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
                        <div class="form-group mb-3">
                            <label class="mb-1" for="phone">الجوال</label>
                            <input
                                type="text"
                                required
                                class="form-control"
                                id="phone"
                                v-model="form.phone"
                            />
                        </div>
                        <button
                            type="submit"
                            class="btn btn-primary text-center m-auto float-start"
                        >
                            تحديث
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
            .get(`/api/customers/${id}`)
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
                phone: "",
            },
            error: null,
        };
    },
    methods: {
        async update() {
            this.error = null;
            if (this.form.name == "") {
                this.error = "يجب ملء جميع الحقول";
            }
            await axios
                .put(`/api/customers/${this.form.id}`, this.form)
                .then((response) => {
                    this.$router.push("/employees");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
