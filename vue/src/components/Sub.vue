<template>
    <div class='submit'>
        테스트 입니다.
    </div>
</template>

<script>
import axios from 'axios';
export default {
    created (){
        axios.get('/api/govue')
            .then(res => console.log('res',res)//, window.location = '/drag'
            )
            .catch(error => console.log('err,',error))
    }
}
</script>