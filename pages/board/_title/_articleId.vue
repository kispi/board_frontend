<template>
    <div class="article-detail">

        <BoardInfo :board="board" :article="article"/>

        <Article
            :article="article"/>

        <Articles
            :selectedArticle="article"
            :articles="board.articles"/>

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
        let board, article;
        try {
            let myParams = {
                query: "title" + ":" + params.title
            }
            const r1 = await $http.get('boards', { params: myParams })
            board = r1.data.data[0]

            myParams = {
                query: "board_id" + ":" + board.id,
                orderby: "-id",
                limit: 20,
            }
            const r2 = await $http.get('articles/' + params.articleId)
            article = r2.data.data
        } catch(e) {
        }
        return {
            board,
            article,
        }
    },
    async validate ({ params }) {
        const r1 = await $http.get('boards', { params: {
            query: "title" + ":" + params.title
        }})
        return r1.data.total === 1;
    },
    created() {
        this.$nuxt.$on('onReplyDeleted', _ => {
            this.reloadArticle();
        });
        this.$nuxt.$on('onReplyPosted', _ => {
            this.reloadArticle();
        })
    },
    methods: {
        async reloadArticle() {
            try {
                const resp = await $http.get('articles/' + this.article.id)
                this.article = resp.data.data;
            } catch(e) {}
        },
    }
}
</script>