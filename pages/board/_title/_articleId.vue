<template>
    <div>
        <div v-if="board">

            <Modal v-if="showConfirmDelete" @close="showConfirmDelete = false">
                <h4 class="c-danger" slot="header">{{ 'DELETE_CONFIRM' | translate }}</h4>
                <div class="flex-rtl" slot="footer">
                    <button class="btn btn-default" @click="showConfirmDelete = false">{{ 'CANCEL' | translate }}</button>
                    <button class="btn btn-danger" @click="onDeleteConfirm">{{ 'CONFIRM' | translate }}</button>
                </div>
            </Modal>

            <div class="flex-row">
                <div class="flex-wrap">
                    <h2 class="c-secondary">{{ board.title }} <span v-if="board.description">({{ board.description }})</span></h2>
                </div>
                <div class="flex-row flex-rtl items-center">
                    {{ board.createdAt | formatDate("YYYY-MM-DD") }}
                </div>
            </div>

            <div class="btn-container flex-rtl">
                <button
                    class="btn btn-sm btn-default m-b-16"
                    @click="onClickWrite">{{ 'WRITE' | translate }}</button>
                <button
                    class="btn btn-sm btn-danger m-b-16"
                    @click="showConfirmDelete = true">{{ 'DELETE' | translate }}</button>
            </div>

            <Article :article="article"/>

            <Articles :articles="articles"/>

        </div>
        <div v-else>
            {{ 'BOARD_NOT_EXIST' | translate }}
        </div>
    </div>
</template>

<script>
import * as $http from 'axios'
import Article from '@/components/Article'
import Articles from '@/components/Articles'
import Modal from '@/components/modals/Modal'

export default {
    layout: 'BaseLayout',
    components: { Article, Articles, Modal },
    data: () => ({
        showConfirmDelete: false,
    }),
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
    methods: {
        onClickWrite() {
            this.$router.push({ name: "write-title", params: { title: this.$route.params.title }})
        },
        onDeleteConfirm() {
            this.showConfirmDelete = false;
            this.$router.push({ name: "board-title", params: { tilte: this.$route.params.title }})
        }
    },
}
</script>