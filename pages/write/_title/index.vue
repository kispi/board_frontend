<template>
    <div class="article-write">
        <Write :board="board"/>
    </div>
</template>

<script>
import Write from '@/components/Write'
import * as $http from 'axios'

export default {
    layout: 'BaseLayout',
    components: { Write },
    async asyncData ({ params, query }) {
        let myParams = {
            filter: "title" + ":" + params.title
        }
        let board;
        try {
            const resp = await $http.get('boards', { params: myParams })
            board = resp.data.data[0]
        } catch (e) {
            console.error(e.response.data)
        }
        return {
            board
        }
    },
    async validate ({ params }) {
        const r1 = await $http.get('boards', { params: {
            filter: "title" + ":" + params.title
        }})
        return r1.data.total === 1;
    },
}
</script>