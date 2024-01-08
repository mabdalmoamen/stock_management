<template>
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="card">
                <div class="card-header"><h5>تعديل المعدة</h5></div>
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
                            <label class="mb-1" for="qty">المخزون</label>
                            <input
                                type="number"
                                required
                                min="0"
                                class="form-control"
                                id="qty"
                                v-model="form.quantity"
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
            .get(`/api/items/${id}`)
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
                quantity: "",
            },
            error: null,
        };
    },
    methods: {
        async update() {
            this.error = null;
            if (this.form.name == "" || this.form.quantity == "") {
                this.error = "يجب ملء جميع الحقول";
            }
            await axios
                .put(`/api/items/${this.form.id}`, this.form)
                .then((response) => {
                    this.$router.push("/items");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
