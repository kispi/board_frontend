<template>
    <ul class="articles">
        <li
            v-for="article in articles"
            @click="onClickArticle(article)"
            :key="article.id">
            <div class="flex-row">
                {{ article.id }}
                {{ article.title }}
            </div>
            <div class="flex-row">
                {{ article.nickname }}
                {{ article.createdAt | formatDate("YYYY-MM-DD", true) }}
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["articles"],
    methods: {
        onClickArticle(article) {
            this.$router.push({
                name: "board-title-articleId",
                params: {
                    articleId: article.id
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
li {
    padding: 8px !important;
}
</style>