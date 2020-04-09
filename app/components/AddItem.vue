<template>
    <Page>
        <StackLayout>
            <Label text="Add New Item"></Label>
            <TextField v-model="name" hint="Enter Grocery Name"></TextField>
            <Button text="Save" @tap="onSaveTap"></Button>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        props: ["id"],
        data: function () {
            return {
                name: "",
            }
        },
        methods: {
            onSaveTap() {
                if (this.name !== "") {
                    const newItem = {
                        id: this.id,
                        name: this.name,
                        done: false,
                        deleted: false,
                    };
                    this.$modal.close(newItem);
                } else {
                    this.$modal.close();
                }

            }
        }
    };
</script>

<style scoped>
    button {
        background-color: #D3D3D3;
        border-width: 5px;
        border-color: #808080;
    }
</style>