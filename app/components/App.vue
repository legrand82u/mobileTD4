<template>
    <Page>
        <ActionBar title="Groceries">
            <ActionItem text="Add" @tap="onAddTap"></ActionItem>
        </ActionBar>
        <GroceryList :items="itemsNotDeleted"/>
    </Page>

</template>

<script>
    import groceryData from "../grocery-data.json";
    import GroceryList from "./GroceryList";
    import AddItem from "./AddItem";
    import * as localStorage from "nativescript-localstorage";
    import LoginPage from "./LoginPage";

    export default {
        components: {GroceryList, AddItem},
        data() {
            return {
                items: [],
            }
        },
        computed: {
            itemsNotDeleted() {
                localStorage.setItem("data", JSON.stringify(this.items));
                return this.items.filter((item) => {
                    return (!item.deleted);
                });
            },
        },
        methods: {
            onAddTap() {
                const newId = new Date().getTime();
                this.$showModal(AddItem, {props: {id: newId}}).then(newItem => {
                    if (newItem) {
                        axios({
                            method: "POST",
                            url: "https://api.todolist.sherpa.one/users/check-token",
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(() => {
                            axios({
                                method: "POST",
                                url: "https://api.todolist.sherpa.one/users/" + localstorage.getItem("uuid") + "/todos",
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                                },
                                data: newItem
                            }).then((res) => {
                                let {data} = response;
                                this.items.push(data.todo);
                            }).catch((error) => {
                                alert("Erreur : " + error);
                            });
                        }).catch((error) => {
                            this.$navigateTo(LoginPage);
                        });
                    }
                });
            },
        },
        created: function () {
            // alert(localStorage.getItem("token"));
            // if (localStorage.getItem("data") !== null) {
            //     this.items = JSON.parse(localStorage.getItem("data"));
            // } else {
            //     this.items = groceryData.groceryItems;
            // }

            axios({
                method: "post",
                url: "https://api.todolist.sherpa.one/users/check-token",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(() => {
                axios({
                    method: "GET",
                    url: "https://api.todolist.sherpa.one/users/" + localstorage.getItem("uuid") + "/todos",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }).then((res) => {
                    let {data} = response;
                    this.items = data.todos;
                }).catch((error) => {
                    alert("Erreur : " + error);
                });
            }).catch((error) => {
                this.$navigateTo(LoginPage);
            })
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 16;
        color: #333333;
    }
</style>
