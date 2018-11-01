<template>
    <div class="write-reply">
        <form>
            <div class="flex-row m-b-8">
                <input
                    name="nickname"
                    maxlength="12"
                    class="form-control m-r-8"
                    :placeholder="'NICKNAME' | translate"
                    v-model="reply.nickname"
                    />
                <input
                    type="password"
                    maxlength="12"
                    name="password"
                    class="form-control"
                    :placeholder="'PASSWORD' | translate"
                    v-model="reply.password"
                    />
            </div>
            <textarea
                class="input-block"
                name="text"
                maxlength="200"
                :placeholder="'WRITE_REPLY_PLACEHOLDER' | translate"
                v-model="reply.text"
                />
        </form>
        <div class="btn-container flex-rtl">
            <button
                type="button"
                ref="save"
                class="btn btn-secondary btn-sm m-t-8"
                :class="{ 'disabled' : !valid }"
                @click="onClickSave">{{ 'SAVE' | translate }}</button>
        </div>
    </div>
</template>
<script>
import * as $http from 'axios';

export default {
    props: ['article'],
    data: () => ({
        reply: {
            article: null,
            user: null,
            nickname: null,
            password: null,
            text: null,
        },
        valid: false,
        validLength: false
    }),
    watch: {
        reply: {
            handler(newVal) {
                if (!newVal.nickname ||
                    !newVal.password ||
                    !newVal.text) {
                    this.valid = false;
                    this.validLength = false;
                    return
                }

                this.valid =   
                    (newVal.nickname !== "" &&
                    newVal.password !== "" &&
                    newVal.text !== "");

                this.validLength =
                    (newVal.nickname.length <= 12 &&
                    newVal.password.length <= 12 &&
                    newVal.text.length <= 200);
            },
            deep: true
        },
    },
    mounted() {
        this.initReply();
    },
    methods: {
        initReply() {
            this.reply = {
                article: this.article,
                user: null,
                nickname: null,
                password: null,
                text: null,
                ip: window.ip()
            }
        },
        async onClickSave() {
            let save = this.$refs["save"];
            if (!this.valid) {
                this.$shake(save);
                this.$toast.error("ERROR_REQUIRED_FIELDS")
                return
            }
            if (!this.validLength) {
                this.$shake(save)
                this.$toast.error("ERROR_INVALID_LENGTH")
                return
            }
            try {
                const resp = await $http.post("replies", this.reply);
                this.$nuxt.$emit('onReplyPosted');
                this.$toast.success("SUCCESS_SAVE");
                this.initReply();
            } catch (e) {}
        }
    }
}
</script>