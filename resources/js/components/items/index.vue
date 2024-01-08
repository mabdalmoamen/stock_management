<template>
    <div class="card mt-2">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">المعدات</h5>
                <router-link to="/items/create" class="btn btn-primary"
                    >اضافة</router-link
                >
                <input
                    type="text"
                    v-model="search"
                    placeholder="البيان"
                    class="form-control w-25"
                />
            </div>
        </div>
        <div class="card-body table-responsive p-0">
            <table class="table-sm w-100 table-bordered text-center">
                <thead>
                    <tr>
                        <th class="w-50">البيان</th>
                        <th>الكمية</th>
                        <th class="w-25">أكشن</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filterSearch" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>
                            <router-link
                                :to="`/items/${item.id}`"
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
    name: "Items",
    data() {
        return {
            items: [],
            search: "",
        };
    },
    async mounted() {
        await this.getItems();
    },
    computed: {
        filterSearch() {
            return this.items.filter((item) => {
                return item.name.match(this.search);
            });
        },
    },
    methods: {
        async getItems() {
            await axios
                .get("/api/items")
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async deleteItem(id) {
            // confirm delete
            if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
            await axios
                .delete(`/api/items/${id}`)
                .then((response) => {
                    this.getItems();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
