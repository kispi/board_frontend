<template>
    <h1 class="c-primary">{{ 'BOARD' | translate }}</h1>
</template>
<script>
export default {
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            console.log(this.$translate("BOARD"));
        }
    }
}
</script>
<style lang="less">
</style>