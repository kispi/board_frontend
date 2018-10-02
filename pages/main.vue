<template>
    <div class="main">
        <h2 class="c-primary">
        {{ 'BOARD' | translate }}
        </h2>
        <div v-if="boards">
            <ul>
                <li
                    v-for="board in boards"
                    :key="board.id">
                    <nuxt-link :to="{name: 'boards', query: { board_title: board.title }}">
                        <div class="flex-wrap">{{ board.title }} ({{ board.description }})</div>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import * as $http from 'axios'

export default {
    layout: 'navs',
    async asyncData ({ params }) {
        const resp = await $http.get('boards')
        return { boards: resp.data.data }
    },
    mounted() {
        this.$router.push("main")
    },
    methods: {
    }
}
</script>
<style lang="less">
ul {
    padding: 8px;

    li {
        padding: 8px;
        list-style-type: none;
    }
}
</style>