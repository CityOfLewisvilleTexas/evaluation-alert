<template>
    <div id="home">
        <div id="list">
            <h2 style="display:block;">Employees Needing Evaluation Alert</h2>
            <div v-show="pendingEmployees.length > 0"> 
                 <sui-dropdown
                    multiple
                    fluid
                    :options="pendingEmployees"
                    placeholder="Employees"
                    search
                    selection
                    v-model="selectedEmployees"
                />
                <sui-button v-if="selectedEmployees.length" @click="dispatchEvaluationAlert(selectedEmployees)">Send Alert{{selectedEmployees.length > 1 ? 's' : ''}}</sui-button>
            </div>
            <div v-show="pendingEmployees.length < 1">
                <h3 style="display:block; margin-top:20px;">Great news! All necessary Evalution Alerts have been sent. </h3>
            </div>
        </div>
        <div id="or">
            <div v-if="loading" class="ui active centered inline loader"></div>    
            <div v-if="requestText !== ''" 
                 class="ui floating message request" 
                 :class="requestText === 'A record for this employee already exists' ? 'error' : 'success'">
                 <p>{{requestText}}</p>
            </div>
        </div>
        <div id="form-container">
            <h4>Send individual evaluation alert</h4>
            <div id="form">
                <label for="employee">Enter Employee Email: </label>
                <input type="email" name="employee" id="employee" v-model="individualEmployee"/>
                <button @click="checkPreviouslySentAlerts(individualEmployee)">Send Alert</button>
            </div>
        </div>
    </div>
</template>
    
<script>
 /* eslint-disable */
import axios from 'axios'
import { Dropdown, ButtonGroup } from 'semantic-ui-vue'
import moment from 'moment'

export default {
    components: {
      'sui-dropdown': Dropdown,
      'sui-button-group': ButtonGroup
  },
    data: () => {
        return {
         employees: [],
         individualEmployee: '',
         selectedEmployees: [],
         requestText: '',
         loading: false
        }
    },
    mounted() {
        this.getEmployeeEvals()
    },
    methods: {
        getEmployeeEvals: function() {
            let that = this
            axios.get('https://ax1vnode1.cityoflewisville.com/v2/?webservice=EvaluationProcess/Recent and Upcoming Eval Alerts')
            .then(response => {
                that.employees = response.data[0]
            })
        },
        checkPreviouslySentAlerts: function(individualEmployee) {
            let that = this
            that.loading = true
            axios.get('https://ax1vnode1.cityoflewisville.com/v2/?webservice=Evaluation Process/Check Previous Alerts', {
                employeeEmail: individualEmployee
            })
            .then(response => {
                if (response.data[0] !== null) {
                    that.loading = false
                    that.requestText = 'A record for this employee already exists'
                    that.individualEmployee = ''
                    setTimeout(() => that.requestText = '', 5000)
                    return
                } else {
                    axios.get('https://ax1vnode1.cityoflewisville.com/v2/?webservice=Evaluation Process/Send Evaluation Alert', {
                        employeeEmail: `${individualEmployee};`
                    })
                    .then(response => {
                        that.loading = false
                        that.requestText = `Evaluation Alert has been sent to ${that.individualEmployee}`
                        setTimeout(() => that.requestText = '', 5000)
                        })
                }
            })
        },
        removeEmp: function(index) {
            this.selectedEmployees.splice(index, 1)
        },
        dispatchEvaluationAlert: function(employeeGroup) {
            let that = this
            this.selectedEmployees.map(emp => that.checkPreviouslySentAlerts(emp))        }
    },
    computed: {
        pendingEmployees: function() {
            return this.employees
                .filter(emp => {
                    let d = new Date()
                    return emp['RecordNumber'] === null
                    && d.getMonth() + 1 >= emp['Notify Supervisor Month']
					&& d.getDay() /*<=*/>= emp['Notify Supervisor Day'] 
                })
                .sort( (a, b) => a['Notify Supervisor Date'] > b['Notify Supervisor Date'] ? 1 : -1)
                .map(emp => {
                    return {
                        key: emp['EmployeeID'],
                        text: `${emp['EmployeeName']} - ${moment(emp['Notify Supervisor Date']).format('MM/DD/YYYY')}`,
                        value: emp['EmployeeEmail']
                    }
                })
        },
        todaysDate: function() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; 

            var yyyy = today.getFullYear();
            if (dd < 10) {
            dd = '0' + dd;
            } 
            if (mm < 10) {
            mm = '0' + mm;
            } 
           return mm + '/' + dd + '/' + yyyy;
        }
    },
    watch: {

    }
}
</script>

<style lang="scss">
    #home {
        display: grid;
        grid-template-columns: 4fr .5fr 4fr;
        grid-template-rows: repeat(5, auto);
        border-radius:5px;
        grid-gap:20px;
        grid-auto-flow: columns;
        margin:12px 0;

        #list {
            grid-column-start:1;
            grid-column-end:1;
            margin: 12px 0 12px 12px;
            grid-row: span 3;
        }
        #or {
            justify-content: center;
            display:flex;
            align-items: center;
        }
        #form-container {
            grid-column-start:3;
            grid-column-end:3;
            margin:12px 0;
        }
        .request {
            color: white;
            border-radius: 8px;
            box-shadow: 1px 2px 10px #999;
            font-size: 1rem;
        }
        .success {
             background: #45d16f;
        }
        .error {
            background: #ff2222;
        }
            *,
            *:before,
            *:after {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            }

            #form {
            max-width: .8fr;
            margin: 10px 20px;
            padding: 10px 20px;
            background: #f4f7f8;
            border-radius: 8px;
            }
            #form {
            box-shadow: 1px 2px 10px #999;
            }
            h1, h2 {
            margin: 0 0 30px 0;
            text-align: center;
            }

            input[type="text"],
            input[type="password"],
            input[type="date"],
            input[type="datetime"],
            input[type="datetime-local"],
            input[type="email"],
            input[type="number"],
            input[type="search"],
            input[type="tel"],
            input[type="time"],
            input[type="url"],
            textarea,
            select {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            font-size: 16px;
            height: auto;
            margin: 0;
            outline: 0;
            padding: 15px;
            width: 100%;
            background-color: #e8eeef;
            color: #8a97a0;
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
            margin-bottom: 30px;
            }

            input[type="radio"],
            input[type="checkbox"] {
            margin: 0 4px 8px 0;
            }
            input:active,
            input:focus {
            box-shadow:inset -1px -1px 4px 0px #999888;
            }
            select {
            padding: 6px;
            height: 32px;
            border-radius: 2px;
            }

            button {
            padding: 19px 39px 18px 39px;
            color: #FFF;
            background-color: #4bc970;
            font-size: 18px;
            text-align: center;
            font-style: normal;
            border-radius: 5px;
            width: 100%;
            border: 1px solid #3ac162;
            border-width: 1px 1px 3px;
            box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
            margin-bottom: 10px;
            }
            button:hover {
            background-color:darken($color:#3ac162, $amount: 2);
            cursor:pointer;
            }

            fieldset {
            margin-bottom: 30px;
            border: none;
            }

            legend {
            font-size: 1.4em;
            margin-bottom: 10px;
            }

            label {
            display: block;
            text-align:left;
            margin-bottom: 8px;
            }

            label.light {
            font-weight: bold;
            display: inline;
            }

            .number {
            background-color: #5fcf80;
            color: #fff;
            height: 30px;
            width: 30px;
            display: inline-block;
            font-size: 0.8em;
            margin-right: 4px;
            line-height: 30px;
            text-align: center;
            text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
            border-radius: 100%;
            }

            // @media screen and (min-width: 480px) {
            // form {
            //     max-width: 480px;
            // }
     //}
 }
</style>