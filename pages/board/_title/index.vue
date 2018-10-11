<template>
    <div class="article-index">

        <BoardInfo :board="board"/>

        <Articles :articles="articles"/>

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
        let board, articles;
        try {
            const r1 = await $http.get('boards', { params: {
                filter: "title" + ":" + params.title
            }})
            board = r1.data.data[0]
            const r2 = await $http.get('articles', { params: {
                filter: "board_id" + ":" + board.id,
                orderby: "-id",
                limit: 20,
            }})
            articles = r2.data.data
        } catch(e) {
        }
        return {
            board,
            articles,
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