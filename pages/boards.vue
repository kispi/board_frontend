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
                    class="btn btn-default"
                    @click="onClickWrite">{{ 'WRITE' | translate }}</button>
            </div>
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
        let params = {
            filter: "title" + ":" + query.board_title
        }
        let board;
        try {
            const resp = await $http.get('boards', { params })
            board = resp.data.data[0]
        } catch (e) {
            console.error(e.response.data)
        }
        return {
            board
        }
    },
    data: () => ({
        showErrorNoBoard: false
    }),
    methods: {
        onClose() {
            this.showErrorNoBoard = false
            this.$router.go(-1)
        },
        onClickWrite() {
            this.$router.push({ name: "write", query: { board_title: this.$route.query.board_title }})
        }
    },
    mounted() {
        this.showErrorNoBoard = !this.board
    }
}
</script>