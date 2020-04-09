<template>
    <GridLayout columns="175, *, 60" >
        <Label col="0" :text="statusText" @tap="toggle"></Label>
        <Label :class="{'line-through' : this.groceryItem.done}" class="item-name" col="1"
               :text="groceryItem.name" textWrap="true" @tap="tapDetails"></Label>
        <Label class="fas" col="2" text="Del" @tap="supprItem"></Label>
    </GridLayout>
</template>

<script>
    export default {
        name: "GroceryItem",
        props: ["groceryItem"],
        data: function () {
            return {}
        },
        computed: {
            statusText: function () {
                return this.groceryItem.done ? 'Done' : 'Not Done';
            }
        },
        methods: {
            supprItem(){
                this.$emit("supprItem",this.groceryItem);
            },
            tapDetails: function() {
                this.$emit('itemTap',this.groceryItem);
            },
            toggle: function () {
                this.$emit("toggleDone", this.groceryItem);
            }
        }
    }
</script>

<style lang="scss" scoped>
    page {
        label {
            color: black;
        }

        .line-through {
            text-decoration: line-through;
        }
    }

    .item-name {
        animation-name: show;
        animation-duration: 1s;
        animation-fill-mode: forwards;

    }

    @keyframes show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
