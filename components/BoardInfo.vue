<template>
    <div>
        <div class="flex-row p-8">
            <div class="flex-fill">
                <h2
                    class="c-secondary"
                    @click="onClickBoardTitle">{{ board.title }} <span v-if="board.description">({{ board.description }})</span></h2>
            </div>
            <div class="btn-container flex-row flex-rtl items-center">
                <button
                    class="btn btn-sm btn-secondary m-l-8"
                    @click="onClickWrite">{{ 'WRITE' | translate }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import * as $http from 'axios'

export default {
    layout: 'BaseLayout',
    props: ['board', 'article'],
    methods: {
        onClickWrite() {
            this.$router.push({ name: "write-title", params: { title: this.$route.params.title }});
        },
        onClickBoardTitle() {
            this.$router.push({ name: "board-title", params: { title: this.$route.params.title }});
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