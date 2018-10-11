<template>
    <div class="main">
        <h3 class="c-primary">
        {{ 'BOARD' | translate }}
        </h3>
        <div v-if="boards">
            <ul>
                <li
                    v-for="board in boards"
                    :key="board.id">
                    <nuxt-link :to="{ name: 'board-title', params: { title: board.title } }">
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
    layout: 'BaseLayout',
    async asyncData ({ params }) {
        const resp = await $http.get('boards')
        return { boards: resp.data.data }
    },
}
</script>
<style lang="less">
.main {
    padding: 16px;
}

ul {
    padding: 8px;

    li {
        padding: 8px;
        list-style-type: none;
    }
}
</style>