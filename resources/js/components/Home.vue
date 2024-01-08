<template>
    <div class="card text-center">
        <div class="card-header">
            <h5 class="card-title">الرئيسية</h5>
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
                        <div class="card-footer">
                            <router-link to="/users" class="nav-link"
                                >المستخدمين</router-link
                            >
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ employee.length }}
                            </h5>
                        </div>
                        <div class="card-footer">
                            <router-link to="/employees" class="nav-link"
                                >الموظفون</router-link
                            >
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ items.length }}
                            </h5>
                        </div>
                        <div class="card-footer">
                            <router-link to="/items" class="nav-link"
                                >المعدات</router-link
                            >
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">؟</h5>
                        </div>
                        <div class="card-footer">
                            <router-link to="/reports" class="nav-link"
                                >التقارير</router-link
                            >
                        </div>
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
            randomColors: [],
        };
    },
    async mounted() {
        await this.getEmployee();
        await this.getItems();
        await this.getUsers();
        for (let i = 0; i < 5; ) {
            let randomColor = this.getRandomColor();

            if (!this.randomColors.includes(randomColor)) {
                this.randomColors.push(randomColor);
                i++;
            }
        }
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
        getRandomColor() {
            let random = Math.floor(Math.random() * 16777215).toString(16);
            if (random.length < 6) {
                random = "0" + random;
            }
            return `#${random}`;
        },
        async getItems() {
            await axios.get("api/items").then((response) => {
                this.items = response.data;
            });
        },
    },
};
</script>
