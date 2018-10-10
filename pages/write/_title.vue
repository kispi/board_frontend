<template>
    <div>
        <form>
            <div class="flex-row m-b-8">
                <input
                    name="nickname"
                    class="form-control m-r-16"
                    :placeholder="'NICKNAME' | translate"
                    v-model="article.nickname"
                    />
                <input
                    type="password"
                    name="password"
                    class="form-control"
                    :placeholder="'PASSWORD' | translate"
                    v-model="article.password"
                    />
            </div>
            <input
                name="title"
                class="form-control m-b-8"
                :placeholder="'WRITE_TITLE_PLACEHOLDER' | translate"
                v-model="article.title"
                />
            <textarea
                name="text"
                :placeholder="'WRITE_TEXT_PLACEHOLDER' | translate"
                v-model="article.text"
                />
        </form>
        <div class="btn-container">
            <button
                ref="save"
                class="btn btn-primary save"
                :class="{ 'disabled' : !valid }"
                @click="onClickSave">{{ 'SAVE' | translate }}</button>
            <button class="btn btn-default cancel" @click="onClickCancel">{{ 'CANCEL' | translate }}</button>
        </div>
    </div>
</template>

<script>
import * as $http from 'axios'
import Toast from '@/components/app/Toast'

export default {
    layout: 'navs',
    components: { Toast },
    async asyncData ({ params, query }) {
        console.log(params);
        let myParams = {
            filter: "title" + ":" + params.title
        }
        let board;
        try {
            const resp = await $http.get('boards', { params: myParams })
            board = resp.data.data[0]
        } catch (e) {
            console.error(e.response.data)
        }
        return {
            board
        }
    },
    data: () => ({
        article: {
            board: null,
            nickname: null,
            password: null,
            title: null,
            text: null,
        },
        valid: false
    }),
    async validate ({ params }) {
        const r1 = await $http.get('boards', { params: {
            filter: "title" + ":" + params.title
        }})
        return r1.data.total === 1;
    },
    watch: {
        article: {
            handler(newVal) {
                this.valid = (newVal.nickname && newVal.password && newVal.title && newVal.text) &&
                    (newVal.nickname !== "" && newVal.password !== "" && newVal.title !== "" && newVal.text !== "")
            },
            deep: true
        }
    },
    methods: {
        onClickCancel() {
            this.$router.go(-1)
        },
        async onClickSave() {
            if (!this.valid) {
                let save = this.$refs["save"]
                this.$shake(save)
                this.toast(this.$translate("ERROR_SAVE"), "bg-danger")
            }
            
            try {
                const resp = await $http.post("articles", this.article)
                this.toast(this.$translate("SUCCESS_SAVE"), "bg-success")
                this.$router.push({ name: "board-title", params: { title: this.$route.params.title } })
            } catch (e) {
                this.toast(this.$translate(e.response.data), "bg-danger")
            }
        },
        toast(msg, bgClass) {
            this.$store.dispatch("app/toast/setToast", {
                message: msg,
                class: bgClass
            })
        }
    },
}
</script>

<style lang="less" scoped>
input, textarea {
    width: 100%;
}

textarea {
    height: 240px;
    resize: none;
}

.btn-container > button {
    min-width: 80px;
    width: 80px;
    margin-top: 8px;
    margin-left: 8px;
}
</style>