<template>
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="card">
                <div class="card-header">
                    <h5>إضافة موظف</h5>
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
                            <label class="mb-1" for="phone">الجوال</label>
                            <input
                                type="text"
                                class="form-control"
                                id="phone"
                                v-model="form.phone"
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
                phone: "",
            },
            error: null,
        };
    },
    methods: {
        async create() {
            this.error = null;
            if (this.form.name == "") {
                this.error = "يجب ملء جميع الحقول";
            }
            await axios
                .post("/api/customers", this.form)
                .then((response) => {
                    this.$router.push("/employees");
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                });
        },
    },
};
</script>
