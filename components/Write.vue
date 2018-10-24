<template>
    <div class="write">
        <form>
            <div class="flex-row m-b-8">
                <input
                    name="nickname"
                    class="form-control m-r-8"
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
        <div class="btn-container flex-rtl">
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
    layout: 'BaseLayout',
    props: ['board', 'passedArticle'],
    components: { Toast },
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
                this.$toast.success("ERROR_SAVE")
                return
            }
            
            this.article.board = this.board;
            try {
                this.$loading(true);
                if (this.passedArticle) {
                    const resp = await $http.put("articles/" + this.article.id, this.article)
                } else {
                    const resp = await $http.post("articles", this.article)
                }
                this.$toast.success("SUCCESS_SAVE")
                this.$router.push({ name: "board-title", params: { title: this.$route.params.title } })
            } catch (e) {
                this.$toast.error("ERROR_SAVE")
            } finally {
                this.$loading(false)
            }
        },
    },
    mounted() {
        if (this.passedArticle) {
            this.article = this.passedArticle;
        }
    }
}
</script>

<style lang="less" scoped>
.write {
    padding: 8px;
}

input, textarea {
    width: 100%;
}

textarea {
    height: 240px;
    resize: none;
}

.btn-container > button {
    margin-top: 8px;
    margin-left: 8px;
    width: 80px;
}
</style>