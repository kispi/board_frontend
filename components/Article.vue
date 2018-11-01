<template>
    <div class="article c-text-dark" v-if="article">

        <Modal v-if="showPasswordConfirm" @close="resetPasswordConfirmPopup">
            <h3 class="c-danger" slot="header">{{ 'DELETE_ARTICLE_CONFIRM' | translate }}</h3>
            <div class="f-14 c-text-dark" slot="body">
                {{ 'DELETE_ARTICLE_CONFIRM_TXT' | translate }}
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

        <div class="article-info">
            <div class="flex-row items-center">
                <div class="article-title title">
                    {{ article.title }}
                </div>
                <div class="btn-container flex-row flex-wrap flex-right">
                    <button
                        class="btn btn-sm btn-accent m-r-8"
                        v-if="article"
                        @click="onEdit">{{ 'EDIT' | translate }}</button>
                    <button
                        class="btn btn-sm btn-danger"
                        v-if="article"
                        @click="onDelete">{{ 'DELETE' | translate }}</button>
                </div>
            </div>
            <div class="flex-row">
                <span class="flex-wrap vr nickname">
                    {{ article.nickname }}
                    <span v-if="article.ip && !article.user">
                        ({{ article.ip | hideTail }})
                    </span>
                </span>
                <span class="flex-wrap vr">
                    {{ article.createdAt | formatDate(undefined, true) }}
                </span>
                <span class="flex-wrap">
                    {{ 'VIEWS' | translate }}
                    {{ article.views }}
                </span>
            </div>
        </div>
        <div class="article-text" v-html="html"/>
        <Replies
            :article="article"
            :replies="article.replies"/>
    </div>
</template>

<script>
import Modal from '@/components/modals/Modal'
import Replies from '@/components/Replies'
import * as $http from 'axios'

export default {
    props: ['article', 'replies'],
    components: { Modal, Replies },
    data: () => ({
        showPasswordConfirm: false,
        password: null,
        popup: {
            title: null,
            text: null,
        }
    }),
    computed: {
        html() {
            let scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
            return this.article.text.replace(scriptRegex, "");
        }
    },
    mounted() {
        this.$loading(false);
    },
    methods: {
        onEdit() {
            this.$router.push({ name: "write-title-articleId", params: { articleId: this.$route.params.articleId } })
        },
        onDelete() {
            this.showPasswordConfirm = true;
        },
        resetPasswordConfirmPopup() {
            this.password = null;
            this.showPasswordConfirm = false;
        },
        async onDeleteConfirm() {
            try {
                const resp = await $http.delete('articles/' + this.article.id + "?password=" +this.password);
                this.$toast.success("SUCCESS_DELETE");
                this.$router.push({ name: "board-title", params: { title: this.$route.params.title }});
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
</style>