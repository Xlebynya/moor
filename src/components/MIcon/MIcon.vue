<template>
    <SvgIcon :path="i[icon]" :size="size" type="mdi" v-bind="$attrs" />
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import * as i from './icons'

defineProps({
    icon: { type: String, required: true },
    size: { type: [Number, String], default: 32 },
})
</script>
