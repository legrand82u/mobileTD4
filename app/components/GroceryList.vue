<template>

    <ListView for="(item,id) in items" swipeActions="true">
        <v-template>
            <GroceryItem :groceryItem="item" @itemTap="onItemTap" @toggleDone="onToggleDone"
                         @supprItem="supprItem"></GroceryItem>
        </v-template>
    </ListView>
</template>

<script>
    import GroceryItem from "./GroceryItem";
    import Detail from "./Detail";

    export default {
        components: {GroceryItem, Detail},
        props: ['items'],

        methods: {
            onToggleDone(groceryItem) {
                const newItem = Object.assign(groceryItem, {done: !groceryItem.done});
                let index = this.items.findIndex(i => i.id === groceryItem.id);
                this.items = Object.assign([], this.items, {idx: newItem});
            },
            onItemTap(args) {
                this.$navigateTo(Detail, {
                    props: {
                        groceryItem: args,
                    },
                    transitionAndroid: {
                        name: "slide",
                        duration: 300,
                        curve: "easeInOut"
                    }
                });
            },
            supprItem(args) {
              let id = this.items.findIndex(i => i.id === args.id);
              this.items[id].deleted = true;
            },
        }
    }
</script>

<style scoped>

</style>
