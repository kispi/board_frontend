<template>
    <div class="article c-text-dark" v-if="article">
        <div class="article-title m-b-8">
            {{ article.title }}
        </div>
        <div class="flex-row">
            <div class="flex-wrap">
                {{ article.nickname }}
            </div>
            <div class="flex-wrap">
                {{ article.createdAt | formatDate(undefined, true) }}
            </div>
            <div class="flex-wrap">
                {{ 'VIEWS' | translate }}
                {{ article.hits }}
            </div>
        </div>
        <div class="article-text" v-html="article.text"/>
    </div>
</template>

<script>
export default {
    props: ["article"],
}
</script>

<style lang="less">
.article {
    font-size: 13px;
    padding: 8px;

    .article-title {
        font-size: 16px;
        font-weight: 800;        
    }

    .article-text {
        white-space: pre-line;
        overflow-wrap: break-word;

        img {
            max-width: 100%;
        }
    }
}
</style>