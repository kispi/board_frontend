<template>
    <div>
        <div v-if="board">
            <div class="flex-row">
                <div class="flex-wrap">
                    <h2 class="c-secondary">{{ board.title }} <span v-if="board.description">({{ board.description }})</span></h2>
                </div>
                <div class="flex-row flex-rtl items-center">
                    {{ board.createdAt | formatDate("YYYY-MM-DD") }}
                </div>
            </div>
            <div class="btn-container">
                <button
                    class="btn btn-default m-b-16"
                    @click="onClickWrite">{{ 'WRITE' | translate }}</button>
            </div>
            <div class="selected-article" v-if="selectedArticle">
                <div class="article-title">
                    {{ selectedArticle.title }}
                </div>
                <div class="article-text">
                    {{ selectedArticle.text }}
                </div>
            </div>
            <Articles :articles="articles"/>
        </div>
        <div v-else>
            {{ 'BOARD_NOT_EXIST' | translate }}
        </div>
    </div>
</template>

<script>
import * as $http from 'axios'
import Articles from '@/components/Articles'

export default {
    layout: 'navs',
    components: { Articles },
    async asyncData ({ params, query }) {
        let board, articles, selectedArticle;
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

            myParams = {
                filter: "id" + ":" + params.articleId,
            }
            const r3 = await $http.get('articles', { params: myParams })
            selectedArticle = r3.data.data[0]
        } catch(e) {
        }
        return {
            board,
            articles,
            selectedArticle,
        }
    },
    async validate ({ params }) {
        const r1 = await $http.get('boards', { params: {
            filter: "title" + ":" + params.title
        }})
        return r1.data.total === 1;
    },
    methods: {
        onClickWrite() {
            this.$router.push({ name: "write-title", params: { title: this.$route.params.title }})
        },
    },
}
</script>
<style lang="less" scoped>
.selected-article {
    .article-text {
        white-space: pre-line;
    }
}
</style>