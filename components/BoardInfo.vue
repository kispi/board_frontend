<template>
    <div>
        <Modal v-if="showConfirmDelete" @close="resetDeletePopup">
            <h3 class="c-danger" slot="header">{{ 'DELETE_CONFIRM' | translate }}</h3>
            <div class="f-14 c-text-dark" slot="body">
                {{ 'DELETE_CONFIRM_TXT' | translate }}
                <input
                    type="password"
                    class="input-block m-t-16"
                    :placeholder="'PASSWORD' | translate"
                    v-model="password"/>
            </div>
            <div class="flex-row flex-center" slot="footer">
                <button class="btn btn-default flex-fill m-r-8" @click="resetDeletePopup">{{ 'CANCEL' | translate }}</button>
                <button class="btn btn-danger flex-fill" @click="onDeleteConfirm">{{ 'CONFIRM' | translate }}</button>
            </div>
        </Modal>

        <div class="flex-row p-8">
            <div class="flex-fill">
                <h2 class="c-secondary">{{ board.title }} <span v-if="board.description">({{ board.description }})</span></h2>
            </div>
            <div class="btn-container flex-row flex-wrap flex-rtl items-center">
                <button
                    class="btn btn-sm btn-default m-l-8"
                    @click="onClickWrite">{{ 'WRITE' | translate }}</button>
                <button
                    class="btn btn-sm btn-danger"
                    v-if="article"
                    @click="showConfirmDelete = true">{{ 'DELETE' | translate }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import * as $http from 'axios'
import Modal from '@/components/modals/Modal'

export default {
    layout: 'BaseLayout',
    props: ['board', 'article'],
    components: { Modal },
    data: () => ({
        password: null,
        showConfirmDelete: false,
    }),
    methods: {
        onClickWrite() {
            this.$router.push({ name: "write-title", params: { title: this.$route.params.title }});
        },
        resetDeletePopup() {
            this.password = null;
            this.showConfirmDelete = false;
        },
        async onDeleteConfirm() {
            this.resetDeletePopup();
            try {
                const resp = await $http.delete('articles/' + this.article.id + "?password=" +this.password);
                this.$router.push({ name: "board-title", params: { tilte: this.$route.params.title }});
            } catch (e) {
                console.error(e);
            }
        }
    },
}
</script>