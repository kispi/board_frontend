<template>
    
</template>
<script>
import * as $http from 'axios'

export default {
    async asyncData ({ params }) {
        const resp = await $http.get('boards')
        return { boards: resp.data.data }
    },
    mounted() {
        this.$router.push("board")
    },

}
</script>
<style lang="less">
</style>