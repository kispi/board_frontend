<template>
    <div class="article-index">

        <BoardInfo :board="board"/>

        <Articles :articles="board.articles"/>

    </div>
</template>

<script>
import * as $http from 'axios'
import Articles from '@/components/Articles'
import BoardInfo from '@/components/BoardInfo'

export default {
    layout: 'BaseLayout',
    components: { Articles, BoardInfo },
    async asyncData ({ params, query }) {
        let board;
        try {
            const r1 = await $http.get('boards', { params: {
                filter: "title" + ":" + params.title
            }})
            board = r1.data.data[0]
        } catch(e) {
        }
        return {
            board
        }
    },
    async validate ({ params }) {
        const r1 = await $http.get('boards', { params: {
            filter: "title" + ":" + params.title
        }})
        return r1.data.total === 1;
    },
}
</script>