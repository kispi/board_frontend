<template>
    <div>
        <Modal v-if="showPasswordConfirm" @close="resetPasswordConfirmPopup">
            <h3 :class="'c-' + popup.class" slot="header">{{ popup.title | translate }}</h3>
            <div class="f-14 c-text-dark" slot="body">
                {{ popup.text | translate }}
                <input
                    type="password"
                    class="input-block m-t-16"
                    :placeholder="'PASSWORD' | translate"
                    v-model="password"/>
            </div>
            <div class="flex-row flex-center" slot="footer">
                <button class="btn btn-default flex-fill m-r-8" @click="resetPasswordConfirmPopup">{{ 'CANCEL' | translate }}</button>
                <button
                    class="btn flex-fill"
                    :class="'btn-' + popup.class"
                    @click="popup.func"
                    :disabled="!password || password.length === 0">{{ 'CONFIRM' | translate }}</button>
            </div>
        </Modal>

        <div class="flex-row p-8">
            <div class="flex-fill">
                <h2 class="c-secondary">{{ board.title }} <span v-if="board.description">({{ board.description }})</span></h2>
            </div>
            <div class="btn-container flex-row flex-rtl items-center">
                <button
                    class="btn btn-sm btn-default m-l-8"
                    @click="onClickWrite">{{ 'WRITE' | translate }}</button>
                <button
                    class="btn btn-sm btn-danger m-l-8"
                    v-if="article"
                    @click="onDelete">{{ 'DELETE' | translate }}</button>
                <button
                    class="btn btn-sm btn-accent"
                    v-if="article"
                    @click="onEdit">{{ 'EDIT' | translate }}</button>
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
        showPasswordConfirm: false,
        popup: {
            title: null,
            text: null,
        }
    }),
    methods: {
        onClickWrite() {
            this.$router.push({ name: "write-title", params: { title: this.$route.params.title }});
        },
        onEdit() {
            this.showPasswordConfirm = true;
            this.popup = {
                title: "EDIT_CONFIRM",
                text: "EDIT_CONFIRM_TXT",
                class: "accent",
                func: this.onEditConfirm
            }
        },
        onDelete() {
            this.showPasswordConfirm = true;
            this.popup = {
                title: "DELETE_CONFIRM",
                text: "DELETE_CONFIRM_TXT",
                class: "danger",
                func: this.onDeleteConfirm,
            }
        },
        resetPasswordConfirmPopup() {
            this.password = null;
            this.showPasswordConfirm = false;
        },
        async onEditConfirm() {
            this.$router.push({
                name: "write-title-articleId",
                params: { id: this.article.id },
                query: { password: this.password }
            });
            this.resetPasswordConfirmPopup();
        },
        async onDeleteConfirm() {
            try {
                const resp = await $http.delete('articles/' + this.article.id + "?password=" +this.password);
                this.$router.push({ name: "board-title", params: { title: this.$route.params.title }});
            } catch (e) {
                if (e.response) {
                    switch (e.response.data) {
                        case "INVALID_PASSWORD":
                            break;
                        default:
                            break;
                    }
                }
            }
            this.resetPasswordConfirmPopup();
        }
    },
}
</script>
<style lang="less" scoped>
.btn-container {
    button {
        width: 60px !important;
        flex: none;
    }
}
</style>