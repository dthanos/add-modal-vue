<template>
    <v-dialog max-width="400" :modelValue="addModalValue" :transition="transition" @click:outside="() => {addModalValue = false;$emit('close')}">
        <v-card v-if="!addModalLoading">
            <v-card-title style="display: flex; justify-content: space-between">
                {{ title ?? $t('labels.crud.add') }}
                <v-btn class="text-right" elevation="0" light @click="() => {addModalValue = false;$emit('close')}">
                    <v-icon icon="mdi-close"></v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text :key="`form-${rerenKey}`">
                <v-form ref="addModalForm">
                    <component
                        class="pb-2"
                        v-for="(item, index) in addModalOptions"
                        v-bind="item.options"
                        v-show="item?.options.hasOwnProperty('showOn') ? addModalObject[item.options?.showOn] : true"
                        :modelValue="addModalObject[item.options.name]"
                        :items="item.options?.updatee
                            ? item.options.items.filter(i => i[addModalOptions?.find(j => j.options.updater)?.options.name] === addModalObject[addModalOptions?.find(j => j.options.updater)?.options.name])
                            : item.options.items
                        "
                        :is="item.type"
                        :rules="item?.options.hasOwnProperty('showOn') && !addModalObject[item.options?.showOn]
                                ? []
                                : item.options?.rules ?? item?.required
                                    ? [value => !!value || $t('messages.fieldRequired')]
                                    : []
                        "
                        :hide-details="false"
                        @update:modelValue="(e) => {
                            pushDataToStore(item.options.name, e);
                            if(item.options?.updater) {
                                addModalObject[addModalOptions?.find(j => j.options.updatee)?.options.name] = null;
                                rerenKey++;
                            }
                        }"
                        @click:appendInner="(e) => {
                            item.options.hasOwnProperty('append-inner-function') ? item.options['append-inner-function'](addModalObject, addModalOptions, rerenKey) : null
                            rerenKey++;
                        }"
                    />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="() => {addModalValue = false;$emit('close')}">{{ $t('labels.close') }}</v-btn>
                <v-btn color="success" text @click="onSubmit">{{ submitButtonText ?? $t('labels.crud.add') }}</v-btn>
            </v-card-actions>
        </v-card>
        <VSkeletonLoader v-else type="heading, list-item, list-item, list-item, list-item, actions" />
    </v-dialog>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";

const addModalStore = useAddModalStore()
const { addModalOptions, addModalValue, addModalObject, addModalForm, addModalLoading, addModalState } = storeToRefs(addModalStore)
const props = defineProps({
    title: String,
    submitButtonText: String,
    transition: String,
    value: Boolean,
    autoCloseOnSubmit: Boolean,
    autoClearOnClose: Boolean,
})
const emit = defineEmits(['update:modelValue', 'add', 'close'])
const tempData = ref({})
const tempActiveData = ref({})
const i18n = useI18n()
const rerenKey = ref(1)
const pushDataToStore = (key, value) => {
    eval(`tempData.value.${key} = value`)
    addModalStore.setAddModalObject(tempData.value)
    tempData.value = {};
}
const onSubmit = () => {
    // addModalStore.setActiveFilters(filters.value)  // Setting active filters same as current
    // searchTriggerKey.value++
    // emit('search', true)
    emit('add', addModalObject.value);
    if(props.autoCloseOnSubmit) addModalValue.value = false;
}
function cleanse() {
    addModalLoading.value = false;
    addModalState.value = true;
    addModalObject.value = {};
}
onUnmounted(() => cleanse())
onMounted(() => {
    // addModalOptions.value.map((i) => eval(`tempActiveData.value.${i.options.name} = null`))
    // addModalStore.setActiveFilters(/*JSON.parse(JSON.stringify(*/tempActiveData.value)/*))*/
})
watch(addModalValue, (newAddModalValue) => {
    if(!addModalValue.value && props.autoClearOnClose)
        cleanse();
})
</script>
