<template>
    <div class="article c-text-dark" v-if="article">
        <div class="article-info">
            <div class="article-title m-b-5">
                {{ article.title }}
            </div>
            <div class="flex-row">
                <span class="flex-wrap vr">
                    {{ article.nickname }}
                </span>
                <span class="flex-wrap vr">
                    {{ article.createdAt | formatDate(undefined, true) }}
                </span>
                <span class="flex-wrap">
                    {{ 'VIEWS' | translate }}
                    {{ article.views }}
                </span>
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