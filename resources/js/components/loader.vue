<template>
    <div class="text-center" v-if="loading">
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
