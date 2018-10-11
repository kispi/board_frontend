<template>
    <div class="article-detail">

        <BoardInfo :board="board" :article="article"/>

        <Article :article="article"/>

        <Articles :articles="articles"/>

    </div>
</template>

<script>
import * as $http from 'axios'
import Article from '@/components/Article'
import Articles from '@/components/Articles'
import BoardInfo from '@/components/BoardInfo'
import Modal from '@/components/modals/Modal'

export default {
    layout: 'BaseLayout',
    components: { Article, Articles, BoardInfo, Modal },
    async asyncData ({ params, query }) {
        let board, articles, article;
        try {
            let myParams = {
                filter: "title" + ":" + params.title
            }
            const r1 = await $http.get('boards', { params: myParams })
            board = r1.data.data[0]

            myParams = {
                filter: "board_id" + ":" + board.id,
                orderby: "-id",
                limit: 20,
            }
            const r2 = await $http.get('articles', { params: myParams })
            articles = r2.data.data

            const r3 = await $http.get('articles/' + params.articleId)
            article = r3.data.data
        } catch(e) {
        }
        return {
            board,
            articles,
            article,
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