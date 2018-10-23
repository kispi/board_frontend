<template>
    <div class="replies">
        <div class="flex-row f-15 f-700" v-if="replies">
            <div class="flex-wrap">{{ 'TOTAL_REPLIES' | translate }}</div>
            <span class="c-red m-l-5">[{{ replies.length }}]</span>
        </div>
        <Reply
            :reply="reply"
            v-for="reply in replies"
            :key="reply.id"/>
        <WriteReply :article="article"/>
    </div>
</template>
<script>
import * as $http from 'axios';
import Reply from '@/components/Reply'
import WriteReply from '@/components/WriteReply'

export default {
    props: ['article', 'replies'],
    components: { Reply, WriteReply },
}
</script>
<style lang="less" scoped>
.replies {
    margin: 8px 0;

    & > * {
        padding: 8px;
    }
}
</style>