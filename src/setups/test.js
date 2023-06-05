import { reactive , ref} from 'vue'

let contracts = reactive({
    fileName: '',
    data: {},
})
let fileName = ref('')
export default function test() {
    const setContracts = (fn) => {
        contracts.fileName = fn.fileName
        contracts.data = fn.data
    }
    const setFileName = (fn) =>{
        fileName.value = fn
    }
    return {
        contracts,
        fileName,
        setContracts,
        setFileName
    }
}