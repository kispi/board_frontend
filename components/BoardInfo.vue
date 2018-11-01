<template>
    <div>
        <div class="flex-row items-center p-8">
            <div class="flex-fill">
                <h2
                    class="c-secondary"
                    @click="onClickBoardTitle">{{ board.title }} <span v-if="board.description">({{ board.description }})</span></h2>
            </div>
            <button
                class="btn btn-sm btn-secondary flex-wrap m-l-8"
                @click="onClickWrite">{{ 'WRITE' | translate }}</button>
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