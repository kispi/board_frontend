<template>
    <div class="base-layout">
        <Toast/>
        <Loading/>
        <div class="header"></div>
        <nuxt id="section"/>
        <div class="bottom-nav"></div>
    </div>
</template>
<script>
import Loading from "@/components/app/Loading"
import Toast from "@/components/app/Toast"

export default {
    components: { Loading, Toast },
}
</script>