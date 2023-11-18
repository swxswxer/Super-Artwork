<template>
    <div>
        {{ username }}
    </div>
</template>

<script>

export default {
    data() {
        return {

            username: '未登陆',

        }

    },
    mounted() {
        this.$bus.$on('getUsername', (username) => {
            console.log(123)
            // this.username = username
        })
    },


}

</script>