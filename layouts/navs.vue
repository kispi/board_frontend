<template>
    <div class="navs">
        <Toast/>
        <div class="header"></div>
        <nuxt id="section" />
        <div class="bottom-nav"></div>
    </div>
</template>
<script>
import Toast from "@/components/app/Toast"

export default {
    components: { Toast },
}
</script>