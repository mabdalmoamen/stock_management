<template>
    <div class="card mt-2">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">الموظفون</h5>
                <router-link to="/employees/create" class="btn btn-primary"
                    >اضافة</router-link
                >
                <input
                    type="text"
                    v-model="search"
                    placeholder="الاسم"
                    class="form-control w-25"
                />
            </div>
        </div>
        <div class="card-body table-responsive p-0">
            <table class="table-sm w-100 table-bordered text-center">
                <thead>
                    <tr>
                        <th class="w-50">الاسم</th>
                        <th>الجوال</th>
                        <th class="w-25">أكشن</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filterSearch" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.phone }}</td>
                        <td>
                            <router-link
                                :to="`/employees/${item.id}`"
                                class="btn btn-primary mx-2"
                                >تعديل</router-link
                            >
                            <button
                                class="btn btn-danger"
                                @click="delete item.id"
                            >
                                حذف
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "Employees",
    data() {
        return {
            employees: [],
            search: "",
        };
    },
    async mounted() {
        await this.getEmployees();
    },
    computed: {
        filterSearch() {
            return this.employees.filter((item) => {
                return item.name.match(this.search);
            });
        },
    },
    methods: {
        async getEmployees() {
            await axios
                .get("/api/customers")
                .then((response) => {
                    this.employees = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async delete(id) {
            // confirm delete
            if (!confirm("هل أنت متأكد من حذف هذا الموظف؟")) return;
            await axios
                .delete(`/api/customers/${id}`)
                .then((response) => {
                    this.getEmployees();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
