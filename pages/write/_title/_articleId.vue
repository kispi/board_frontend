<template>
    <div class="article-edit">
        <Write :board="board" :passedArticle="article"/>
    </div>
</template>

<script>
import Modal from '@/components/modals/Modal'
import Write from '@/components/Write'
import * as $http from 'axios'

export default {
    layout: 'BaseLayout',
    components: { Modal, Write },
    async asyncData ({ params, query }) {
        let myParams = {
            query: "title" + ":" + params.title
        }
        let board, article;
        try {
            const resp1 = await $http.get('boards', { params: myParams })
            board = resp1.data.data[0]

            const resp2 = await $http.get('articles/' + params.articleId)
            article = resp2.data.data
        } catch (e) {
            console.error(e.response.data)
        }
        return {
            article, board
        }
    },
    async validate ({ params }) {
        const r1 = await $http.get('boards', { params: {
            query: "title" + ":" + params.title
        }})

        if (r1.data.total !== 1) {
            return false;
        }

        const r2 = await $http.get('articles', { params: {
            query: "id" + ":" + params.articleId
        }})

        if (r2.data.total !== 1) {
            return false;
        }

        if (window.localStorage.getItem("password") === undefined) {
            return false;
        }

        return true;
    }
}
</script>
