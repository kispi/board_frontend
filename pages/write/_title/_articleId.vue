<template>
    <div class="article-edit">
        <Modal v-if="showPasswordConfirm" @close="resetPasswordConfirmPopup">
            <h3 class="c-accent" slot="header">{{ 'EDIT_CONFIRM' | translate }}</h3>
            <div class="f-14 c-text-dark" slot="body">
                {{ 'EDIT_CONFIRM_TXT' | translate }}
                <input
                    type="password"
                    class="input-block m-t-16"
                    :placeholder="'PASSWORD' | translate"
                    v-model="password"/>
            </div>
            <div class="flex-row flex-center" slot="footer">
                <button class="btn btn-default flex-fill m-r-8" @click="resetPasswordConfirmPopup">{{ 'CANCEL' | translate }}</button>
                <button
                    class="btn btn-accent flex-fill"
                    @click="onPasswordConfirm"
                    :disabled="!password || password.length === 0">{{ 'CONFIRM' | translate }}</button>
            </div>
        </Modal>
        <Write :board="board" :passedArticle="article" v-if="edit"/>
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
        edit: false,
        password: null,
        showPasswordConfirm: true,
    }),
    async validate ({ params }) {
        const r1 = await $http.get('boards', { params: {
            filter: "title" + ":" + params.title
        }})

        if (r1.data.total !== 1) {
            return false;
        }

        const r2 = await $http.get('articles', { params: {
            filter: "id" + ":" + params.articleId
        }})

        if (r2.data.total !== 1) {
            return false;
        }        

        return true;
    },
    methods: {
        resetPasswordConfirmPopup() {
            this.$router.go(-1);
        },
        async onPasswordConfirm() {
            try {
                const r = await $http.post('articles/' + this.$route.params.articleId + "/checkPassword", {
                    password: this.password
                })
                if (r.data.data === "success") {
                    this.article.password = this.password;
                    this.edit = true;
                }
            } catch (e) {
                this.$router.push({ name: "board-title", params: { title: this.$route.params.title }});
            }
            this.resetPasswordConfirmPopup();
        },
    }
}
</script>