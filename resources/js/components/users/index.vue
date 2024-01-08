<template>
    <div class="card mt-2">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">المستخدمون</h5>
                <router-link to="/users/create" class="btn btn-primary"
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
                        <th>البريد الالكتروني</th>
                        <th class="w-25">أكشن</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filterSearch" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <router-link
                                :to="`/users/${item.id}`"
                                class="btn btn-primary mx-2"
                                >تعديل</router-link
                            >
                            <button
                                class="btn btn-danger"
                                @click="deleteItem(item.id)"
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
    name: "Users",
    data() {
        return {
            users: [],
            search: "",
        };
    },
    async mounted() {
        await this.getUsers();
    },
    computed: {
        filterSearch() {
            return this.users.filter((item) => {
                return item.name.match(this.search);
            });
        },
    },
    methods: {
        async getUsers() {
            await axios
                .get("/api/users")
                .then((response) => {
                    this.users = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async deleteItem(id) {
            // confirm delete
            if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
            await axios
                .delete(`/api/users/${id}`)
                .then((response) => {
                    this.getUsers();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
