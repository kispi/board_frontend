<template>
    <div class="write-reply">
        <form>
            <div class="flex-row m-b-8">
                <input
                    name="nickname"
                    class="form-control m-r-8"
                    :placeholder="'NICKNAME' | translate"
                    v-model="reply.nickname"
                    />
                <input
                    type="password"
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
    }),
    watch: {
        reply: {
            handler(newVal) {
                this.valid = (newVal.nickname && newVal.password && newVal.text) &&
                    (newVal.nickname !== "" && newVal.password !== "" && newVal.text !== "")
            },
            deep: true
        }
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
            if (!this.valid) {
                let save = this.$refs["save"];
                this.$shake(save);
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