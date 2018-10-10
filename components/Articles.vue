<template>
    <ul>
        <li
            v-for="article in articles"
            @click="onClickArticle(article)"
            :key="article.id">
            {{ article.id }}
            {{ article.title }}
            {{ article.nickname }}
            {{ article.createdAt | formatDate("YYYY-MM-DD") }}
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