<template>
    <Page>
        <StackLayout>
            <Label :text="groceryItem.name" textWrap="true"></Label>
            <StackLayout orientation="horizontal">
                <Button text="Go Back" @tap="$navigateBack"></Button>
                <Button :text="statusText" @tap="toggle"></Button>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
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
            toggle: function () {
                this.groceryItem.done = !this.groceryItem.done;
            },
            onBackTap() {
                //Execute logic before going back
                this.$navigateBack();
            }
        }
    };
</script>

<style lang="scss" scoped>

    Label {
        text-align: center;
        font-size: 32px;
    }
    Button {
        width: 50%;
    }

</style>