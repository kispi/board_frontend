<template>
    <div class="reply">
        <Modal v-if="showPasswordConfirm" @close="resetPasswordConfirmPopup">
            <h3 class="c-danger" slot="header">{{ 'DELETE_REPLY_CONFIRM' | translate }}</h3>
            <div class="f-14 c-text-dark" slot="body">
                {{ 'DELETE_REPLY_CONFIRM_TXT' | translate }}
                <input
                    type="password"
                    class="input-block m-t-16"
                    :placeholder="'PASSWORD' | translate"
                    v-model="password"/>
            </div>
            <div class="flex-row flex-center" slot="footer">
                <button class="btn btn-default flex-fill m-r-8" @click="resetPasswordConfirmPopup">{{ 'CANCEL' | translate }}</button>
                <button
                    class="btn btn-danger flex-fill"
                    @click="onDeleteConfirm"
                    :disabled="!password || password.length === 0">{{ 'CONFIRM' | translate }}</button>
            </div>
        </Modal>

        <div class="reply-info p-relative">
            <i
                class="zmdi zmdi-close p-absolute"
                @click="onDelete"></i>
            <div class="flex-row">
                <span class="flex-wrap nickname">
                    {{ reply.nickname }}
                </span>
                <span class="c-text" v-if="reply.ip && !reply.user">
                    ({{ reply.ip | hideTail }})
                </span>
            </div>
            <div class="break-word">
                {{ reply.text }}
            </div>
            <div class="flex-wrap c-text">
                {{ reply.createdAt | formatDate("YYYY-MM-DD HH:mm:ss") }}
            </div>
        </div>
    </div>
</template>
<script>
import * as $http from 'axios';
import Modal from '@/components/modals/Modal'

export default {
    props: ['reply'],
    components: { Modal },
    data: () => ({
        showPasswordConfirm: false,
        password: null
    }),
    methods: {
        onDelete() {
            this.showPasswordConfirm = true;
        },
        resetPasswordConfirmPopup() {
            this.password = null;
            this.showPasswordConfirm = false;
        },
        async onDeleteConfirm() {
            try {
                const resp = await $http.delete('replies/' + this.reply.id + "?password=" + this.password);
                this.password = null;
                this.$toast.success("SUCCESS_DELETE");
                this.$nuxt.$emit('onReplyDeleted');
            } catch (e) {
                if (e.response) {
                    this.$toast.error(e.response.data);
                }
            }
            this.resetPasswordConfirmPopup();
        }
    }
}
</script>
<style lang="less" scoped>
i.zmdi-close {
    top: 0;
    right: 0;
}
</style>