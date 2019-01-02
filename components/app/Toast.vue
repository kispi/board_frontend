<template>
    <transition name="slide-down">
        <div
            class="toast-wrapper"
            v-if="toast.show">
            <div
                class="toast shadow"
                :class="toast.class">
                <div v-html="html" />
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data: () => ({
        toast: {
            message: null,
            class: null,
            show: false,
        }
    }),
    methods: {
        resetToast() {
            this.toast.message = null
            this.toast.class = null
            this.toast.show = false
        }
    },
    computed: {
        html() {
            return this.$options.filters.textToHTML(
                this.$translate(this.toast.message)
            )
        },
    },
    mounted() {
        this.$nuxt.$on('onToast', payload => {
            payload.message = payload.message.trim();
            this.toast = payload
            this.toast.show = true

            var toastTimeout = setTimeout(() => {
                this.resetToast()
            }, 2000)
        })
    },
};
</script>
