<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>HTTP</h1>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="user.username"
            class="form-control"
            type="text"
            name="username"
            id="username"
          >
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="user.email" class="form-control" type="text" name="email" id="email">
        </div>
        <button @click="submit()" class="btn btn-primary">Submit</button>
      </div>
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <!-- <input v-model="node" class="form-control" type="text"> -->
        <select class="form-control" v-model="node" name="node" id="">
            <option value="employees">Employees</option>
            <option value="users">Users</option>
        </select>
        <br>
        <br>
        <button @click="fetchData()" class="btn btn-info">Get Data</button>
        <br>
        <br>
        <ul class="list-group">
          <li class="list-group-item" v-for="user in users">{{ user.username }} - {{ user.email }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: ""
      },
      users: [],
      response: "",
      error: "",
      resource: {},
      node: 'users'
    };
  },
  created() {
    const customActions = {
      saveEmployees: { method: "POST", url: "employees.json" },
      getData: {method: 'GET'}
    };
    this.resource = this.$resource("{node}.json", {}, customActions);
  },
  methods: {
    fetchData() {
    this.resource.getData({node: this.node})
    .then(response => {
          return response.json();
        })
        .then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.users = resultArray;
        });;
    },
    saveEmployee() {
      this.resource.saveEmployees({}, this.user);
    },
    submit() {
      //   this.$http
      //     .post("users.json", this.user)
      //     .then(
      //       response => {
      //         this.response = response.statusText;
      //       },
      //       error => {
      //         console.log(error);
      //         this.error = "There was an error. See console.";
      //       }
      //     );
      this.resource.save({}, this.user);
      this.user.username = "";
      this.user.email = "";
    },
    clearResponse() {
      this.response = "";
      this.error = "";
    }
  }
};
</script>

<style>
</style>
