import { defineStore } from "pinia";
import {computed, reactive, ref, watch} from "vue";

export const useAddModalStore =  defineStore('addModal', () => {
    const addModalValue = ref(false)
    const addModalObject = ref({})
    const addModalForm = ref(null)
    const addModalLoading = ref(false)
    const addModalOptions = shallowRef([])
    const addModalState = ref(true)
    const activeFilters = ref({})
    const filterStatus = ref(false)
    const searchTriggerKey = ref(0)

    const getaddModalObject = computed(() => addModalObject.value)
    const setAddModalObject = (data) => addModalObject.value = {...addModalObject.value, ...data}
    const getActiveFilters = computed(() => activeFilters.value)
    const setActiveFilters = (data) => activeFilters.value = data
    const getFilterStatus = computed(() => filterStatus.value)
    const setFilterStatus = (data) => filterStatus.value = data

    function cleanse() {
        addModalValue.value = false;
        addModalLoading.value = false;
        addModalObject.value = {};
        addModalOptions.value = [];
    }
    // watch(activeFilters, () => {
    //     let once = false
    //     Object.keys(activeFilters.value).map((key) => {
    //         if(activeFilters.value[key] !== null) {
    //             filterStatus.value = true
    //             once = true
    //         }
    //     })
    //     if(!once) filterStatus.value = false
    // }, {deep: true})

    return {
        addModalValue,
        addModalOptions,
        addModalObject,
        addModalForm,
        addModalLoading,
        addModalState,
        // activeFilters,
        // filterStatus,
        // searchTriggerKey,

        getaddModalObject,
        setAddModalObject,
        cleanse,
        // setActiveFilters,
        // getFilterStatus,
        // setFilterStatus,
    }
}, {
    persist: false
})
