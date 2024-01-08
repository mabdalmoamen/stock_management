<template>
    <div class="card text-center p-0 m-0 min-vh-100">
        <div class="card-header">
            <!-- search filed to get employees -->
            <div class="d-flex justify-content-around">
                <h5>صرف معدة</h5>
                <input
                    type="text"
                    placeholder="كود-باركود المعدة"
                    class="form-control w-25"
                    v-model="barcode"
                    @change="findByBarcode()"
                />
                <input
                    type="text"
                    placeholder="كود-جوال الموظف"
                    class="form-control w-25"
                    v-model="search"
                    @keyup="findEmployee()"
                />
                <input
                    class="form-control w-25"
                    readonly
                    v-if="employee"
                    :value="employee.name"
                />

                <button class="btn btn-primary" @click="submit()">حفظ</button>
            </div>
        </div>
        <div class="card-body p-0 m-0">
            <div class="row">
                <div class="col-6">
                    <div class="card min-vh-100" v-if="items.length">
                        <div class="card-header">
                            <h5 class="card-title text-end">المعدات</h5>
                        </div>
                        <div class="card-body m-0 p-0">
                            <!-- get list of items in cards -->
                            <div class="row">
                                <div
                                    class="col-4"
                                    v-for="item in items"
                                    :key="item.id"
                                >
                                    <div
                                        class="card mb-2"
                                        @click="addToCart(item)"
                                        style="cursor: pointer"
                                    >
                                        <div class="card-body">
                                            <span
                                                class="float-start position-absolute"
                                                style="right: 0; top: 0"
                                                :class="`
                                                        ${
                                                            item.quantity < 1
                                                                ? 'badge bg-danger'
                                                                : 'badge bg-success'
                                                        }
                                                    `"
                                            >
                                                {{ item.quantity }}
                                            </span>
                                            <img
                                                :src="item.image"
                                                width="50"
                                                height="50"
                                            />
                                            <!-- v-else add default image from placeholder -->
                                            <div class="card-text text-end">
                                                {{ item.name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card min-vh-100" v-if="cart.length">
                        <div class="card-header">
                            <h5 class="card-title text-end">السلة</h5>
                        </div>
                        <div class="card-body m-0 p-0">
                            <!-- get list of cart in cards -->
                            <div class="row">
                                <div
                                    class="col-6"
                                    v-for="item in cart"
                                    :key="item.id"
                                >
                                    <div class="card mb-2">
                                        <div class="card-body">
                                            <div
                                                class="d-flex justify-content-between"
                                            >
                                                <img
                                                    :src="item.image"
                                                    width="50"
                                                    height="50"
                                                />
                                                <h5 class="card-title">
                                                    {{ item.name }}
                                                </h5>
                                                <button
                                                    class="btn btn-xs btn-danger"
                                                    @click="
                                                        removeFromCart(item)
                                                    "
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-footer">
                                            <input
                                                class="form-control text-center"
                                                type="number"
                                                min="1"
                                                v-model="item.qty"
                                                @change="updateQty(item)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            search: "",
            employee: null,
            employees: [],
            items: [],
            cart: [],
            form: {},
            barcode: null,
        };
    },
    async mounted() {
        await this.getEmployee();
        await this.getItems();
    },
    computed: {
        filteredList() {
            return this.employees.filter((employee) => {
                return employee.name
                    .toLowerCase()
                    .includes(this.search.toLowerCase());
            });
        },
    },
    methods: {
        async findEmployee() {
            await axios
                .get("api/customers/" + this.search)
                .then((response) => {
                    this.employee = response.data;
                })
                .catch((error) => {
                    this.employee = null;
                    console.log(error);
                });
        },
        async findByBarcode() {
            // find Item by barcode
            if (this.barcode) {
                await axios
                    .get("api/items/" + this.barcode)
                    .then((response) => {
                        if (response.data) {
                            this.addToCart(response.data);
                            this.barcode = null;
                        } else {
                            alert("الباركود غير صحيح");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        async updateQty(item) {
            if (item.qty < 1) {
                alert("الكمية لا تقل عن صفر");
                item.qty = 1;
            }
            if (item.qty > item.quantity) {
                alert("الكمية لا تزيد عن متوفرة");
                item.qty = item.quantity;
            }
            this.cart = [...this.cart];
        },
        async getEmployee() {
            await await axios
                .get("api/customers")
                .then((response) => {
                    this.employees = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async getItems() {
            await axios
                .get("api/items")
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async addToCart(item) {
            // check if item already in cart
            if (this.cart.indexOf(item) !== -1) {
                alert("هذه المعدة موجودة في السلة");
                return;
            }
            item.qty = 1;
            this.cart.push(item);
            this.cart = [...this.cart];
        },
        async removeFromCart(item) {
            this.cart.splice(this.cart.indexOf(item), 1);
            this.cart = [...this.cart];
        },
        async submit() {
            if (this.cart.length === 0) {
                alert("يجب اختيار معدة واحده على الاقل");
                return;
            }
            if (
                this.employee === null ||
                this.employee === undefined ||
                this.employee === ""
            ) {
                alert("يجب اختيار الموظف");
                return;
            }

            this.form.customer_id = this.employee.id;
            this.form.cart = this.cart;
            // send cart to server
            await axios.post("api/inuses", this.form).then((response) => {
                this.cart = [];
                this.form = {};
                this.form.cart = [];

                // show success message
                alert(" تمت العملية بنجاح ");

                // redirect to home page
                this.$router.push({ name: "home" });
            });
        },
    },
};
</script>
<style>
.card {
    border-radius: 0;
}
</style>
