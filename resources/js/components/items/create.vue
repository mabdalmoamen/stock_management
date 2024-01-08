<template>
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="card">
                <div class="card-header">
                    <h5>إضافة معدة</h5>
                </div>
                <div class="card-body">
                    <div class="alert alert-sm alert-danger" v-if="error">
                        {{ error }}
                    </div>
                    <form @submit.prevent="create">
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
        async create() {
            this.error = null;
            if (this.form.name == "" || this.form.quantity == "") {
                this.error = "يجب ملء جميع الحقول";
            }
            await axios
                .post("/api/items", this.form)
                .then((response) => {
                    this.$router.push("/items");
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                });
        },
    },
};
</script>
