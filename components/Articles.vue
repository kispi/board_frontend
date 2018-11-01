<template>
    <ul class="articles">
        <li
            v-for="article in articles"
            @click="onClickArticle(article)"
            :key="article.id">
            <div class="flex-row">
                <div
                    class="flex-fill article-info"
                    :class="{'selected': (selectedArticle || {}).id === article.id}">
                    <div class="flex-row flex-wrap">
                        <span class="flex-wrap vr">
                            {{ article.id }}
                        </span>
                        <span class="flex-fill title">
                            {{ article.title }}
                        </span>
                    </div>
                    <div class="flex-row c-text">
                        <span class="flex-wrap nickname">
                            {{ article.nickname }}
                        </span>
                        <span class="flex-wrap" v-if="article.ip && !article.user">
                            ({{ article.ip | hideTail }})
                        </span>
                        <span class="flex-wrap vr"></span>
                        <span class="flex-wrap vr">
                            {{ article.createdAt | formatDate("YYYY-MM-DD", true) }}
                        </span>
                        <span class="flex-wrap">
                            {{ 'VIEWS' | translate }}
                            {{ article.views }}
                        </span>
                    </div>
                </div>
                <div class="flex flex-wrap flex-center reply-count">{{ article.replyCount || 0 }}</div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['selectedArticle', 'articles'],
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