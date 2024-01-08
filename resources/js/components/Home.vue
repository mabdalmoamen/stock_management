<template>
    <div class="card text-center">
        <div class="card-header">
            <h1 class="card-title">الرئيسية</h1>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ users.length }}
                            </h5>
                        </div>
                        <div class="card-footer">Users</div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ employee.length }}
                            </h5>
                        </div>
                        <div class="card-footer">Employee</div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ items.length }}
                            </h5>
                        </div>
                        <div class="card-footer">Items</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            employee: [],
            items: [],
            users: [],
        };
    },
    async mounted() {
        await this.getEmployee();
        await this.getItems();
        await this.getUsers();
    },
    methods: {
        async getEmployee() {
            await axios.get("api/customers").then((response) => {
                this.employee = response.data;
            });
        },
        async getUsers() {
            await axios.get("api/users").then((response) => {
                this.users = response.data;
            });
        },
        async getItems() {
            await axios.get("api/items").then((response) => {
                this.items = response.data;
            });
        },
    },
};
</script>
