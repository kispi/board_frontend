<template>
    <div>
        <Modal @close="onClose" v-if="showErrorNoBoard">
            <h3 slot="header">{{ 'ERR_BOARD_NOT_EXIST' | translate }}</h3>
            <div class="btn-container" slot="footer">
                <button
                    @click="onClose"
                    class="btn btn-primary">{{ 'OK' | translate }}</button>
            </div>
        </Modal>
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
            <table class="list-articles">
                <tbody>
                    <tr
                        v-for="article in articles"
                        @click="onClickArticle(article)"
                        :key="article.id">
                        <td>{{ article.id }}</td>
                        <td>{{ article.title }}</td>
                        <td>{{ article.nickname }}</td>
                        <td>{{ article.createdAt | formatDate("YYYY-MM-DD") }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            {{ 'BOARD_NOT_EXIST' | translate }}
        </div>
    </div>
</template>

<script>
import * as $http from 'axios'
import Modal from '@/components/modals/Modal'

export default {
    layout: 'navs',
    components: { Modal },
    async asyncData ({ p, query }) {
        let board, articles, selectedArticle;
        try {
            const r1 = await $http.get('boards', { params: {
                filter: "title" + ":" + query.board_title
            }})
            board = r1.data.data[0]
            const r2 = await $http.get('articles', { params: {
                filter: "board_id" + ":" + board.id,
                orderby: "-id",
                limit: 20,
            }})
            articles = r2.data.data

            if (query.article_id) {
                const r3 = await $http.get('articles', { params: {
                    filter: "id" + ":" + query.article_id,
                }})
                selectedArticle = r3.data.data[0]
            }
        } catch(e) {
            console.error(e.response.data)
        }
        return {
            board,
            articles,
            selectedArticle,
        }
    },
    data: () => ({
        showErrorNoBoard: false,
    }),
    watchQuery: ['article_id'],
    methods: {
        onClose() {
            this.showErrorNoBoard = false
            this.showErrorNoArticle = false
            this.$router.go(-1)
        },
        onClickWrite() {
            this.$router.push({ name: "write", query: { board_title: this.$route.query.board_title }})
        },
        onClickArticle(article) {
            this.$router.push({
                    query: {
                        board_title: this.$route.query.board_title,
                        article_id: article.id
                    }
                })
        }
    },
    mounted() {
        this.showErrorNoBoard = !this.board
    }
}
</script>
<style lang="less" scoped>
tr {
    cursor: pointer;

    td {
        margin: 0;
    }
}

.selected-article {
    .article-text {
        white-space: pre-line;
    }
}
</style>