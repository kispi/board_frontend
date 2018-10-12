<template>
    <div class="article-edit">
        <Write :board="board" :passedArticle="article"/>
    </div>
</template>

<script>
import Write from '@/components/Write'
import * as $http from 'axios'

export default {
    layout: 'BaseLayout',
    components: { Write },
    async asyncData ({ params, query }) {
        let myParams = {
            filter: "title" + ":" + params.title
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
    data: () => ({
        valid: false
    }),
    async validate ({ params }) {
        const r1 = await $http.get('boards', { params: {
            filter: "title" + ":" + params.title
        }})
        return r1.data.total === 1;
    },
}
</script>