<!-- واجهة التقارير باستخدام فيو js -->
<template>
    <div>
        <div class="card">
            <div class="card-header">
                <form @submit.prevent="viewReport()">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group mb-2">
                                <input type="text" class="form-control" placeholder="كود-باركود-اسم الصنف"
                                    v-model="filters.item_id" @keyup="viewReport()" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group mx-2 mb-2">
                                <select class="form-control" v-model="filters.customer_id">
                                    <option :value="null">الموظف</option>
                                    <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                                        {{ customer.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group mx-2 mb-2">
                                <select class="form-control" v-model="filters.user_id">
                                    <option :value="null">مدير الجرد الحاسب</option>
                                    <option v-for="user in users" :key="user.id" :value="user.id">
                                        {{ user.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group mx-2 mb-2">
                                <select class="form-control" v-model="filters.in_use">
                                    <option :value="null">الحالة</option>
                                    <option value="1">مستلمه</option>
                                    <option value="0">غير مستلمه</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group mx-2 mb-2">
                                <input type="date" class="form-control" v-model="filters.start_date" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group mx-2 mb-2">
                                <input type="date" class="form-control" v-model="filters.end_date" />
                            </div>
                        </div>
                    </div>

                    <!-- start_date and end_date -->

                    <!-- submit button -->

                    <button type="submit" class="btn btn-primary mb-2 float-start">
                        بحث
                    </button>
                </form>
            </div>
            <div class="card-body">
                <div class="alert alert-sm alert-danger" v-if="error">
                    {{ error }}
                </div>

                <Loader v-if="loading" :loading="loading" />

                <div v-else class="table-responsive text-center">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">M</th>
                                <th scope="col">العميل</th>
                                <th scope="col">مدير الجرد الحاسب</th>
                                <th scope="col">الحالة</th>
                                <th scope="col">تاريخ دخول العهدة</th>
                                <th scope="col">تاريخ خروج العهدة</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(report, index) in reports" :key="index" style="color: white; cursor: pointer"
                                class="text-center text-light" :class="{ selected: index === selectedIndex }">
                                <th :class="`${report.in_use
                                    ? 'bg-success'
                                    : 'bg-danger'
                                    }`" scope="row" @click="setItems(report)">
                                    {{ index + 1 }}
                                </th>
                                <td :class="`${report.in_use
                                    ? 'bg-success'
                                    : 'bg-danger'
                                    }`">
                                    {{ report.customer.name }}
                                </td>
                                <td :class="`${report.in_use
                                    ? 'bg-success'
                                    : 'bg-danger'
                                    }`">
                                    {{ report.user.name }}
                                </td>
                                <td :class="`${report.in_use
                                    ? 'bg-success'
                                    : 'bg-danger'
                                    }`" class="text-center">
                                    <label class="form-check-label" style="cursor: pointer">
                                        {{
                                            report.in_use
                                            ? "مستلمه"
                                            : "غير مستلمه"
                                        }}
                                        <!-- update -->
                                        <input class="form-check-input" type="checkbox" v-model="report.in_use"
                                            :checked="report.in_use" @change="update(report)" />
                                    </label>
                                </td>
                                <td :class="`${report.in_use
                                    ? 'bg-success'
                                    : 'bg-danger'
                                    }`">
                                    <!-- print date format   -->
                                    {{ report.created_at }}
                                </td>
                                <td :class="`${report.in_use
                                    ? 'bg-success'
                                    : 'bg-danger'
                                    }`">
                                    {{ report.updated_at }}
                                </td>
                            </tr>
                        </tbody>
                        <!-- in_use -->
                    </table>
                    <table class="table table-bordered" v-if="items.length > 0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">العهد</th>
                                <th scope="col">الكمية</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in items" :key="index" class="text-center">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.quantity }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from "./loader.vue";

export default {
    name: "reports",
    methods: {
        async viewReport() {
            this.loading = true;
            this.error = null;
            this.reports = [];
            this.items = [];
            await axios
                .get("api/inuses", { params: this.filters })
                .then((response) => {
                    this.reports = response.data;
                    this.items = response.data[0].items;
                    this.loading = false;
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = error.response.data.message;
                    console.log(error);
                });
        },
        async getCustomers() {
            await axios
                .get("api/customers")
                .then((response) => {
                    this.customers = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async getUsers() {
            await axios
                .get("api/users")
                .then((response) => {
                    this.users = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        setItems(report) {
            this.selectedIndex = this.reports.indexOf(report);
            this.items = report.items;
        },
        async update(report) {
            await axios
                .patch(`api/inuses/${report.id}`, report)
                .then((response) => {
                    this.viewReport();
                    alert("تم تحديث الحالة بنجاح");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    async mounted() {
        await this.getCustomers();
        await this.getUsers();
    },
    data() {
        return {
            search: "",
            filters: {
                customer_id: null,
                user_id: null,
                in_use: null,
            },
            customers: [],
            selectedIndex: 0,
            users: [],
            error: null,
            reports: [],
            loading: false,
            items: [],
        };
    },
    components: { Loader },
};
</script>

<style scoped>
.selected {
    background-color: rgb(68, 109, 77) !important;
    color: white;
}

table:first-of-type td {
    color: white;
    font-weight: bolder;
}
</style>
