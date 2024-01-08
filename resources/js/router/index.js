import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/Home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },

    {
        path: "/login",
        name: "Login",
        component: () => import("../components/auth/login.vue"),
    },
    {
        path: "/users",
        name: "users",
        component: () => import("../components/users/index.vue"),
    },
    {
        path: "/users/:id",
        name: "user",
        component: () => import("../components/users/edit.vue"),
    },
    // create route
    {
        path: "/users/create",
        name: "user-create",
        component: () => import("../components/users/create.vue"),
    },
    // logout
    {
        path: "/logout",
        name: "logout",
        component: () => import("../components/auth/logout.vue"),
    },
    // new Route
    {
        path: "/new",
        name: "new",
        component: () => import("../components/new.vue"),
    },
    {
        path: "/items",
        name: "items",
        component: () => import("../components/items/index.vue"),
    },
    // item route
    {
        path: "/items/:id",
        name: "item",
        component: () => import("../components/items/edit.vue"),
    },
    // create route
    {
        path: "/items/create",
        name: "create",
        component: () => import("../components/items/create.vue"),
    },
    // Employees Route
    {
        path: "/employees",
        name: "employees",
        component: () => import("../components/employees/index.vue"),
    },
    // Employee Route
    {
        path: "/employees/:id",
        name: "employee",
        component: () => import("../components/employees/edit.vue"),
    },
    // create route
    {
        path: "/employees/create",
        name: "employee-create",
        component: () => import("../components/employees/create.vue"),
    },
    // Users
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        // ...
        return { top: 0 };
    },
});

export default router;
